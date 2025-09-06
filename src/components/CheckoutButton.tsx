import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { supabase } from '@/lib/supabase'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const stripePromise = loadStripe('pk_test_51QY8r0A4eeLtNLxKIU5uDKUCKWNKwkN9tPmMtCO2UNY5Z9bNvM7MzT2S9JKrWA4WLpyVAmA8qFoSCL6Q8Bp4kN5e00M8ztF8Gq')

interface CheckoutFormProps {
  clientSecret: string
  onClose: () => void
}

function CheckoutForm({ clientSecret, onClose }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const { clearCart } = useCart()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    })

    if (error) {
      toast.error(error.message || 'Ocurrió un error en el pago')
    } else {
      // Payment will be handled by the return_url or webhook
      clearCart()
      toast.success('¡Pago procesado exitosamente!')
      onClose()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Procesando...' : 'Pagar Ahora'}
      </button>
    </form>
  )
}

export default function CheckoutButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const { state, getTotalPrice } = useCart()

  const handleOpenCheckout = async () => {
    setLoading(true)
    setIsOpen(true)

    try {
      // Create payment intent
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: getTotalPrice(),
          currency: 'usd',
          cartItems: state.items,
          customerEmail: customerInfo.email || undefined,
          shippingAddress: {
            name: customerInfo.name,
            address: customerInfo.address,
            city: customerInfo.city,
            postal_code: customerInfo.postalCode
          }
        }
      })

      if (error) throw error

      if (data?.data?.clientSecret) {
        setClientSecret(data.data.clientSecret)
      } else {
        throw new Error('No se pudo obtener el client secret')
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al iniciar el checkout')
      setIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#ec4899',
    }
  }

  return (
    <>
      <motion.button
        onClick={handleOpenCheckout}
        disabled={loading}
        className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <CreditCard className="h-5 w-5" />
        <span>{loading ? 'Iniciando...' : 'Proceder al Pago'}</span>
      </motion.button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                        Checkout - ${getTotalPrice().toFixed(2)} USD
                      </Dialog.Title>

                      {!clientSecret ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre completo
                            </label>
                            <input
                              type="text"
                              value={customerInfo.name}
                              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Dirección
                            </label>
                            <input
                              type="text"
                              value={customerInfo.address}
                              onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ciudad
                              </label>
                              <input
                                type="text"
                                value={customerInfo.city}
                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Código Postal
                              </label>
                              <input
                                type="text"
                                value={customerInfo.postalCode}
                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                          <CheckoutForm clientSecret={clientSecret} onClose={() => setIsOpen(false)} />
                        </Elements>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}