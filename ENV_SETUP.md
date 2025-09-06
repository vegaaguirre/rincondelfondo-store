# Configuración de Variables de Entorno para Vercel

## 🔐 Variables Requeridas

Para que tu tienda funcione correctamente en Vercel, necesitas configurar estas variables de entorno:

### Supabase
```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_supabase
```

### Stripe
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_stripe
```

## 📋 Cómo obtener las variables:

### Supabase:
1. Ve a tu proyecto en https://supabase.com
2. Settings → API
3. Copia "Project URL" y "anon/public key"

### Stripe:
1. Ve a tu dashboard en https://stripe.com
2. Developers → API keys
3. Copia la "Publishable key"

## ⚙️ Configurar en Vercel:

1. **Proyecto Vercel:** Settings → Environment Variables
2. **Añade cada variable** una por una
3. **Aplica a:** Production, Preview, Development
4. **Redeploy** tu proyecto

## 🔒 Seguridad:
- ✅ Usa claves públicas (VITE_*)
- ❌ NUNCA pongas claves privadas en variables VITE_*
- ✅ Las claves privadas van en Supabase Edge Functions
- ✅ Vercel protege automáticamente las variables de entorno

## 🧪 Testing:
Puedes usar estas variables de prueba temporalmente:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef
```

⚠️ **Importante:** Reemplaza con tus claves reales antes del lanzamiento.