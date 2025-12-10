import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    // --- THE FIX IS HERE ---
    define: {
        // This manually defines the missing variable that is crashing your app
        __DEFINES__: {},
    },
})