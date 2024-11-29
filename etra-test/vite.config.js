import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      ".js": "jsx", // Specify that .js files should be treated as JSX
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    transformMode: {
      web: [/\.jsx?$/], // Ensure JSX is correctly handled
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // Modify Ant Design Less variables here
        modifyVars: {
          "@primary-color": "#1DA57A", // Customize the primary color
        },
        javascriptEnabled: true, // Required for Ant Design
      },
    },
  },
});
