import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // base: '/andes-bank/',  <-- REMOVE OR COMMENT OUT THIS LINE
    base: '/', // Set it to root for custom domains
})