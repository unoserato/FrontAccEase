import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.1.102:8001", // Your local FastAPI port
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' prefix before forwarding to FastAPI
    //   },
    // },
  },
})
