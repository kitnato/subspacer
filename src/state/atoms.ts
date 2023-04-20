import type { Keyring } from "@polkadot/api";
import { atom } from "recoil";

import type { API, SubspacerError } from "@subspacer/types";

export const api = atom<API | null>({
  default: null,
  key: "api",
});

export const error = atom<SubspacerError>({
  default: { description: "", domain: "", isShowing: false },
  key: "error",
});

export const isLoading = atom<boolean | string>({
  default: false,
  key: "isLoading",
});

export const fileMapping = atom<
  Record<string, { local: Uint8Array | null; objectID: string; remote: Uint8Array }>
>({
  default: {},
  key: "fileMapping",
});

export const keyring = atom<Keyring | null>({
  default: null,
  key: "keyring",
});

export const selectedAddress = atom({
  default: "",
  key: "selectedAddress",
});
