import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5183,
    // backend/ and admin/ are sibling apps in this workspace — don't let the
    // website's dev server watch their dependencies.
    watch: { ignored: ['**/backend/**', '**/admin/**'] },
  },
})
