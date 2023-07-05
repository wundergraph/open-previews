import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { SWRConfig } from "swr";
import { swrLocalStorageProvider } from "./lib/wundergraph";
import {
  OpenPreviewConfig,
  setOpenPreviewConfig,
} from "./utils/state/openPreviewConfig";
import { SESSION_STORAGE_WIDGET_ACTIVE } from "./utils/constants/constants";

const initOpenPreviews = (options: OpenPreviewConfig) => {
  const op = document.getElementsByTagName("open-previews")[0];

  if (op) {
    return; // already initialized
  }

  const root = document.createElement("open-previews");
  document.body.appendChild(root);

  setOpenPreviewConfig(options);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <SWRConfig value={{ provider: swrLocalStorageProvider }}>
        <App />
      </SWRConfig>
    </React.StrictMode>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const script = document.getElementById("open-previews");
  initOpenPreviews({
    repository: script?.dataset.repository || "",
    categoryId: script?.dataset["category-id"] || "",
  });
});
