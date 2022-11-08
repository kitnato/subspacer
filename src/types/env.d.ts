interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_FARMER_WS_PROVIDER: string;
  readonly VITE_NODE_WS_PROVIDER: string;
}
