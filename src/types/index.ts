import { ApiPromise, WsProvider } from "@polkadot/api";

export interface API {
  endpoint: ApiPromise;
  provider: WsProvider;
}

export interface SubspacerError {
  description: string;
  domain: string;
  isShowing: boolean;
}
