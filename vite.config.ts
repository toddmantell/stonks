import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// 2/13/23: attempted to migrate from these docs: https://cathalmacdonnacha.com/migrating-from-create-react-app-cra-to-vite
// But local desktop can only run node 12 and that didn't support esmodules like newer versions of node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});
