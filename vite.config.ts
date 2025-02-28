import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",  
      reporter: ["text", "json", "html"],  
      exclude: ["node_modules/", "dist/", "src/setupTests.ts"],  
    },
  },
});
