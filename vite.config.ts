import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/react-router/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: [
        "https://puter-net.b-cdn.net/rustls.js",
        "https://unpkg.com/web-streams-polyfill@3.0.2/dist/polyfill.js"
      ]
    }
  }
});
