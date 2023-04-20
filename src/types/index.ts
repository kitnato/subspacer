import type { ApiPromise, WsProvider } from "@polkadot/api";

export type API = {
  endpoint: ApiPromise;
  provider: WsProvider;
};

export type SubspacerError = {
  description: string;
  domain: string;
  isShowing: boolean;
};
