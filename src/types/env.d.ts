type ImportMeta = {
  readonly env: ImportMetaEnv;
};

type ImportMetaEnv = {
  readonly VITE_FARMER_WS_PROVIDER: string;
  readonly VITE_NODE_WS_PROVIDER: string;
};
