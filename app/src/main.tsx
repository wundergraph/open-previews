import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";
import { swrLocalStorageProvider } from "./lib/wundergraph";
import {
  OpenPreviewConfig,
  setOpenPreviewConfig,
} from "./utils/state/openPreviewConfig";

export const OpenPreviews = (props: OpenPreviewConfig) => {
  useEffect(() => {
    setOpenPreviewConfig(props);
  }, [props.categoryId, props.repository]);

  return (
    <SWRConfig value={{ provider: swrLocalStorageProvider }}>
      <App />
    </SWRConfig>
  );
};

export const initOpenPreviews = (options: OpenPreviewConfig) => {
  const root = document.insertBefore(
    document.body,
    document.createElement("open-previews")
  );

  console.log({ options });

  setOpenPreviewConfig(options);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <SWRConfig value={{ provider: swrLocalStorageProvider }}>
        <App />
      </SWRConfig>
    </React.StrictMode>
  );
};
