import { defineConfig } from "vite";

export default defineConfig({
  root: "tests",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: "esnext"
  }
});