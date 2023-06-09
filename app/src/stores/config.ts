import { persistentAtom } from "@nanostores/persistent";
import { LOCAL_STORAGE_OPEN_PREVIEWS_CONFIG } from "../utils/constants/constants";
import { useStore } from "@nanostores/react";

export interface OpenPreviewConfig {
  repository: string;
  categoryId: string;
}

export const $openPreviewConfig = persistentAtom<OpenPreviewConfig>(
  LOCAL_STORAGE_OPEN_PREVIEWS_CONFIG,
  {
    repository: "",
    categoryId: "",
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const setOpenPreviewConfig = (config: OpenPreviewConfig) => {
  $openPreviewConfig.set(config);
};

export const useConfig = () => {
  return useStore($openPreviewConfig);
};
