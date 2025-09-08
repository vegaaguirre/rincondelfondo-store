# 🚀 Guía Completa para Deploy en Vercel - El Rincón del Fondo

## 🌸 Tu tienda de flores artesanales lista para deploy

Esta guía te llevará paso a paso para desplegar tu tienda en Vercel **GRATIS** con tu dominio personalizado.

---

## ✅ **PASO 1: Preparación (YA HECHO)**

Todos los archivos ya están optimizados para Vercel:
- ✅ `vercel.json` configurado
- ✅ `package.json` optimizado
- ✅ Build scripts listos
- ✅ Variables de entorno preparadas

---

## 📋 **PASO 2: Crear Cuenta en Vercel**

1. **Ve a:** https://vercel.com
2. **Haz clic en:** "Sign Up"
3. **Elige:** "Continue with GitHub" (recomendado)
4. **Autoriza** Vercel para acceder a tu GitHub

---

## 🗂️ **PASO 3: Subir tu Proyecto a GitHub**

### Opción A: GitHub Desktop (Más Fácil)
1. Descarga GitHub Desktop: https://desktop.github.com
2. Crea nuevo repositorio
3. Arrastra la carpeta `rincon-del-fondo-store` al repositorio
4. Haz commit y push

### Opción B: Línea de comandos
```bash
# En la carpeta rincon-del-fondo-store
git init
git add .
git commit -m "Initial commit - El Rincón del Fondo Store"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/rincon-del-fondo-store.git
git push -u origin main
```

---

## 🚀 **PASO 4: Deploy en Vercel**

1. **En Vercel Dashboard:** Haz clic en "New Project"
2. **Importa tu repositorio** de GitHub
3. **Configura el proyecto:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (dejar por defecto)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Variables de Entorno (IMPORTANTE):**
   Añade estas variables en la sección "Environment Variables":
   ```
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=tu_stripe_publishable_key
   VITE_GA_MEASUREMENT_ID=tu_id_de_medicion_de_ga
   ```

5. **Haz clic en:** "Deploy"

---

## 🌐 **PASO 5: Configurar tu Dominio Personalizado**

1. **En Vercel Project:** Settings → Domains
2. **Añade tu dominio:** Ej: `rincondelfondo.store`
3. **Configura DNS** según las instrucciones de Vercel:
   - Tipo: `A`
   - Nombre: `@` (o tu subdominio)
   - Valor: `76.76.19.61` (IP de Vercel)
   
   **O usar CNAME:**
   - Tipo: `CNAME`
   - Nombre: `www`
   - Valor: `cname.vercel-dns.com`

---

## 🔧 **CONFIGURACIONES ADICIONALES**

### SSL Certificado
✅ **Automático** - Vercel proporciona SSL gratis

### Performance
✅ **CDN Global** - Tu sitio será súper rápido

### Actualizaciones
✅ **Auto-deploy** - Cada push a GitHub actualiza tu sitio

---

## 🎯 **PASO 6: Configurar Supabase para Producción**

1. **En tu Supabase Dashboard:**
   - Settings → API
   - Copia URL y Anon Key

2. **Añade el dominio de Vercel** a los dominios autorizados:
   - Authentication → URL Configuration
   - Site URL: `https://tu-dominio.vercel.app`
   - Redirect URLs: `https://tu-dominio.vercel.app/**`

---

## 🛠️ **COMANDOS ÚTILES**

```bash
# Probar localmente
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Deploy manual (si tienes Vercel CLI)
vercel --prod
```

---

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### Error: "Module not found"
- Verificar que todas las dependencias estén en `package.json`
- Ejecutar `npm install` localmente

### Error: "Build failed"
- Verificar que `npm run build` funcione localmente
- Revisar variables de entorno

### Error: "404 en rutas"
- El archivo `vercel.json` ya está configurado para SPA routing

### Dominio no funciona
- Verificar configuración DNS
- Esperar hasta 48h para propagación

---

## ✅ **CHECKLIST FINAL**

- [ ] Cuenta Vercel creada
- [ ] Proyecto subido a GitHub
- [ ] Deploy exitoso en Vercel
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado
- [ ] DNS configurado
- [ ] Supabase configurado para producción
- [ ] SSL funcionando
- [ ] Sitio accesible

---

## 🎉 **¡LISTO!**

Tu tienda **"El Rincón del Fondo"** estará disponible en:
- **URL temporal:** `https://tu-proyecto.vercel.app`
- **Tu dominio:** `https://tu-dominio.com`

**Características incluidas:**
✅ E-commerce completo con carrito
✅ Integración Stripe para pagos
✅ Base de datos Supabase
✅ Diseño responsive
✅ SSL gratuito
✅ CDN global
✅ Auto-deploy

---

## 📞 **¿Necesitas Ayuda?**

Si tienes algún problema durante el deploy, asegúrate de:
1. Seguir cada paso en orden
2. Verificar que las variables de entorno estén correctas
3. Comprobar que el proyecto funcione localmente primero

¡Tu tienda estará funcionando en menos de 10 minutos! 🚀