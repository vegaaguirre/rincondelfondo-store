import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-identifier'
import sitemap from 'vite-plugin-sitemap' // <-- 1. IMPORTAR

const isProd = process.env.BUILD_MODE === 'prod'

export default defineConfig({
  plugins: [
    react(), 
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    }),
    sitemap({
      hostname: 'https://rincondelfondo.store',
      exclude: [
        '/admin/login',
        '/admin/dashboard',
        '/admin/add-product',
        '/admin/edit-product/*'
      ],
      dynamicRoutes: [
        '/',
      ]
    } as any)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})