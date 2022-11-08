import { ApiPromise, WsProvider } from "@polkadot/api";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import { api, error, isLoading } from "@subspacer/state/atoms";
import { FARMER_WS_PROVIDER, NODE_WS_PROVIDER } from "@subspacer/utilities/constants";

export default function () {
  const resetError = useResetRecoilState(error);
  const setAPI = useSetRecoilState(api);
  const setError = useSetRecoilState(error);
  const setLoading = useSetRecoilState(isLoading);

  return async () => {
    resetError();
    setLoading("Connecting API");

    try {
      const farmerProvider = new WsProvider(FARMER_WS_PROVIDER);
      const nodeProvider = new WsProvider(NODE_WS_PROVIDER);

      const endpoint = await ApiPromise.create({
        provider: nodeProvider,
      });

      setAPI({ endpoint, provider: farmerProvider });
    } catch (error) {
      setError({
        description: (error as Error).toString(),
        domain: "API",
        isShowing: true,
      });
    } finally {
      setLoading(false);
    }
  };
}
