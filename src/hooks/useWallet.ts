import { Keyring } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import { name } from "@subspacer/config";
import { error, isLoading, keyring } from "@subspacer/state/atoms";
import { SETTINGS_ACCOUNT, SETTINGS_KEYRING_OPTIONS } from "@subspacer/utilities/constants";

export function useWallet() {
  const resetError = useResetRecoilState(error);
  const setError = useSetRecoilState(error);
  const setLoading = useSetRecoilState(isLoading);
  const setKeyring = useSetRecoilState(keyring);

  const errorDomain = "wallet connection";

  return async () => {
    resetError();
    setLoading("Connecting to wallet");
    setKeyring(null);

    const isReady = await cryptoWaitReady();

    if (isReady) {
      const isWeb3Enabled = await web3Enable(name);

      if (isWeb3Enabled.length === 0) {
        setError({
          description: "Web3 is with not enabled or not available.",
          domain: errorDomain,
          isShowing: true,
        });
      }

      const allWeb3Accounts = await web3Accounts(SETTINGS_ACCOUNT);

      if (allWeb3Accounts.length === 0) {
        setError({
          description: "No accounts found in wallet.",
          domain: errorDomain,
          isShowing: true,
        });
      }

      const keyring = new Keyring(SETTINGS_KEYRING_OPTIONS);

      allWeb3Accounts.forEach(({ address, meta }) => {
        keyring.addFromAddress(address, meta);
      });

      setKeyring(keyring);
    } else {
      setError({
        description: "Initialization failure.",
        domain: errorDomain,
        isShowing: true,
      });
    }

    setLoading(false);
  };
}
