import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tsconfig-paths untuk menggunakan alias "@"
    tsconfigPaths(),
    createSvgIconsPlugin({
      // Tentukan folder ikon yang akan di-cache
      iconDirs: [path.resolve(__dirname, "src/assets/icons")],
      // Tentukan format simbolId
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
