import { useEffect } from "react";

import App from "./App";
import { SWRConfig } from "swr";
import { swrLocalStorageProvider } from "./lib/wundergraph";
import { OpenPreviewConfig, setOpenPreviewConfig } from "./stores/config";

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
