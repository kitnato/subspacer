import type { KeyringPair } from "@polkadot/keyring/types";

export function getAccountName({ address, meta }: Partial<KeyringPair>) {
  return `${((meta?.name as string) || "[NO ACCOUNT NAME]").toUpperCase()} | ${
    address ?? "[NO ACCOUNT ADDRESS]"
  }`;
}
