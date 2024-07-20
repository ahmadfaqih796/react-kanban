import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tsconfig-paths untuk menggunakan alias "@"
    tsconfigPaths(),
    createSvgIconsPlugin({
      // Tentukan folder ikon yang akan di-cache
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
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
