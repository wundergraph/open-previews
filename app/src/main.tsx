import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { SWRConfig } from "swr";
import { swrLocalStorageProvider } from "./lib/wundergraph";
import {
  OpenPreviewConfig,
  setOpenPreviewConfig,
} from "./utils/state/openPreviewConfig";
import { SESSION_STORAGE_WIDGET_ACTIVE } from "./utils/constants/constants";
import { $rootElementReference } from "./utils/state/rootElementReference";

export const OpenPreviews = (props: OpenPreviewConfig) => {
  useEffect(() => {
    setOpenPreviewConfig(props);
  }, [props.categoryId, props.repository]);

  if (sessionStorage.getItem(SESSION_STORAGE_WIDGET_ACTIVE) === "false") {
    return null;
  }

  return (
    <SWRConfig value={{ provider: swrLocalStorageProvider }}>
      <App />
    </SWRConfig>
  );
};

export const initOpenPreviews = (options: OpenPreviewConfig) => {
  if (sessionStorage.getItem(SESSION_STORAGE_WIDGET_ACTIVE) === "false") {
    return;
  }

  const root = document.insertBefore(
    document.body,
    document.createElement("open-previews")
  );

  $rootElementReference.set(root);

  setOpenPreviewConfig(options);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <SWRConfig value={{ provider: swrLocalStorageProvider }}>
        <App />
      </SWRConfig>
    </React.StrictMode>
  );
};
