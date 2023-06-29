import { LOCAL_STORAGE_SWR_CACHE } from "~/utils/constants/constants";
import { createClient, Operations } from "../generated/client";
import type { Cache } from "swr";

import { createHooks } from "@wundergraph/swr";

export const client = createClient();

export const { useQuery, useMutation, useSubscription } =
  /* @ts-ignore */
  createHooks<Operations>(client);

export const swrLocalStorageProvider: (
  cache: Readonly<Cache<any>>
) => Cache<any> = () => {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<string, any>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_SWR_CACHE) || "[]")
  );

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem(LOCAL_STORAGE_SWR_CACHE, appCache);
  });

  // We still use the map for write & read for performance.
  return map;
};
