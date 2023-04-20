import type { Web3AccountsOptions } from "@polkadot/extension-inject/types";
import type { KeyringOptions } from "@polkadot/keyring/types";

export const ACCEPTED_MIME_TYPES = [
  "application/json",
  "application/pdf",
  "application/octet-stream",
  "audio/mp3",
  "image/jpeg",
  "image/gif",
  "image/png",
  "text/csv",
  "text/html",
  "text/x-markdown",
  "text/plain",
];

export const FARMER_WS_PROVIDER = import.meta.env.VITE_FARMER_WS_PROVIDER;

export const NODE_WS_PROVIDER = import.meta.env.VITE_NODE_WS_PROVIDER;

export const MAXIMUM_FILE_COUNT = 6;

export const MAXIMUM_FILE_SIZE = 2;

export const SETTINGS_ACCOUNT: Web3AccountsOptions = {
  accountType: ["sr25519"],
  ss58Format: 2254,
};

export const SETTINGS_KEYRING_OPTIONS: KeyringOptions = {
  ss58Format: 2254,
  type: "sr25519",
};

export const SUPPORTED_WALLETS = ["polkadot-js", "subwallet-js"];
