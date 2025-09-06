#!/bin/bash

# Script de Deploy Automatizado para Vercel - El Rincón del Fondo
# Ejecutar con: chmod +x deploy-vercel.sh && ./deploy-vercel.sh

echo "🌸 Preparando deploy de El Rincón del Fondo en Vercel..."

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "⚠️  Creando archivo .env de ejemplo..."
    cat > .env << EOF
# Configuración de Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_supabase

# Configuración de Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_stripe
EOF
    echo "📝 Por favor edita el archivo .env con tus claves reales"
    echo "📖 Ver ENV_SETUP.md para más detalles"
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Build del proyecto
echo "🔨 Compilando proyecto..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
    echo ""
    echo "🚀 Siguiente paso:"
    echo "1. Sube este proyecto a GitHub"
    echo "2. Conecta GitHub con Vercel"
    echo "3. Configura las variables de entorno en Vercel"
    echo "4. Deploy automático!"
    echo ""
    echo "📖 Ver DEPLOY_VERCEL.md para instrucciones completas"
else
    echo "❌ Error en el build. Revisa las variables de entorno."
    exit 1
fi