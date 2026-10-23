import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/fabi.xd/',
  server: {
    port: 5173,
    open: true,
  },
})