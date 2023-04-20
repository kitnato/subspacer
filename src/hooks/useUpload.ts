import { web3FromSource } from "@polkadot/extension-dapp";
import { u8aToHex } from "@polkadot/util";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { api, error, isLoading, keyring, selectedAddress } from "@subspacer/state/atoms";
import { SUPPORTED_WALLETS } from "@subspacer/utilities/constants";

export function useUpload() {
  const apiValue = useRecoilValue(api);
  const keyringValue = useRecoilValue(keyring);
  const selectedAddressValue = useRecoilValue(selectedAddress);
  const resetError = useResetRecoilState(error);
  const setError = useSetRecoilState(error);
  const setLoading = useSetRecoilState(isLoading);

  const errorDomain = "upload request";

  return async (object: Uint8Array) => {
    if (!apiValue || !keyringValue || !selectedAddressValue) {
      return;
    }

    resetError();
    setLoading("Uploading");

    const { address, meta } = keyringValue.getPair(selectedAddressValue);
    const { endpoint } = apiValue;

    if (
      typeof meta.source !== "string" ||
      (typeof meta.source === "string" && !SUPPORTED_WALLETS.includes(meta.source))
    ) {
      setError({
        description: "Cannot derive signer from wallet.",
        domain: errorDomain,
        isShowing: true,
      });
      setLoading(false);

      return;
    }

    const { signer } = await web3FromSource(meta.source);
    const putterExtrinsic = endpoint.tx.objectStore.put(u8aToHex(object));

    const result = await new Promise<string>((resolve, reject) => {
      putterExtrinsic
        .signAndSend(address, { signer }, ({ events, internalError, isError, status }) => {
          if (status.isInBlock) {
            for (const { event } of events) {
              if (event.method === "ObjectSubmitted" && event.section === "objectStore") {
                // Parse and return the uploaded objectID
                resolve(event.data[1].toString().slice(2));
              }
            }
          }

          if (internalError || isError) {
            setLoading(false);
            reject(
              setError({
                description: internalError?.toString() ?? "signAndSend() returned an error.",
                domain: errorDomain,
                isShowing: true,
              })
            );
          }
        })
        .catch((error) => {
          setError({
            description: (error as Error).toString(),
            domain: errorDomain,
            isShowing: true,
          });
          setLoading(false);
        });
    });

    return result;
  };
}
