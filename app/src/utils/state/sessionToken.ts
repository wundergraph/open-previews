import { persistentAtom } from "@nanostores/persistent";
import { LOCAL_STORAGE_OPEN_PREVIEWS_TOKEN } from "../constants/constants";

export const $sessionToken = persistentAtom<string | null>(
  LOCAL_STORAGE_OPEN_PREVIEWS_TOKEN,
  "",
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const setSessionToken = (token: string | null) => {
  $sessionToken.set(token);
};
