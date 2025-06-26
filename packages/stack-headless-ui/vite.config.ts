import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-oxc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), tanstackRouter()],
  server: {
    port: 5180,
  },
});
