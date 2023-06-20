import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";
import { swrLocalStorageProvider } from "./lib/wundergraph";

export const OpenPreviews = App;

export const initOpenPreviews = (options: any) => {
  const root = document.insertBefore(
    document.body,
    document.createElement("open-previews")
  );

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <SWRConfig value={{ provider: swrLocalStorageProvider }}>
        <App {...options} />
      </SWRConfig>
    </React.StrictMode>
  );
};
