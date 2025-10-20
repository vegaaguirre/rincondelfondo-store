import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { motion } from 'framer-motion'
import CheckoutButton from './CheckoutButton'

export default function CartSidebar() {
  const { state, removeItem, updateQuantity, setCartOpen, getTotalPrice } = useCart()

  return (
    <Transition.Root show={state.isOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={() => setCartOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Carrito de Compras
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCartOpen(false)}
                          >
                            <X className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {state.items.length === 0 ? (
                          <div className="text-center py-12">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
                            <p className="mt-4 text-gray-500">Tu carrito está vacío</p>
                            <p className="text-sm text-gray-400 mt-2">
                              Añade algunas flores hermosas a tu carrito
                            </p>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {state.items.map((item) => (
                                <motion.li
                                  key={item.product_id}
                                  className="flex py-6"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.product_image_url}
                                      alt={item.product_name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3 className="text-sm">{item.product_name}</h3>
                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} cada uno</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                          <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="text-gray-700 font-medium w-8 text-center">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                          <Plus className="h-3 w-3" />
                                        </button>
                                      </div>

                                      <button
                                        onClick={() => removeItem(item.product_id)}
                                        className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {state.items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>${getTotalPrice().toFixed(2)} USD</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Envío calculado en checkout.</p>
                        <div className="mt-6">
                          <CheckoutButton />
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            o{' '}
                            <button
                              type="button"
                              className="font-medium text-pink-600 hover:text-pink-500"
                              onClick={() => setCartOpen(false)}
                            >
                              Continuar comprando
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}