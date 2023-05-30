import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

export const OpenPreviews = App;

export const initOpenPreviews = (options: any) => {
  const root = document.insertBefore(
    document.body,
    document.createElement("open-previews")
  );

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App {...options} />
    </React.StrictMode>
  );
};
