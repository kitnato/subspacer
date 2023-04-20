import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    checker({
      eslint: { lintCommand: "eslint --ext .ts,.tsx" },
      typescript: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    }
  },
});
