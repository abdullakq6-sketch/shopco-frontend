import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

<<<<<<< HEAD
export default defineConfig({
  root: __dirname,

  // base: "/shopco-frontend/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    port: 5173,
    strictPort: false,
  },

=======
const BACKEND = process.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      "/api": {
        target: BACKEND,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("error", (error, _req, res) => {
            const message =
              `Backend se connect nahi ho pa raha (${BACKEND}).\n\n` +
              `Doosre terminal me backend chalayein:\n` +
              `   cd shopco-backend\n` +
              `   npm install\n` +
              `   npm run dev\n\n` +
              `(${error.code || error.message})`;

            console.log(`\n❌ [proxy] ${BACKEND} down — ${error.code || error.message}`);
            console.log(`   Backend chalayein:  cd shopco-backend && npm run dev\n`);

            if (res && !res.headersSent && res.writeHead) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: message, backendDown: true }));
            }
          });
        },
      },
    },
  },
>>>>>>> 6b0aef3c01bcc7479348ee62034be9756067b937
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 6b0aef3c01bcc7479348ee62034be9756067b937
