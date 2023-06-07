import { createContext, useContext } from "react";

export interface OpenPreviewConfig {
  repository: string;
  categoryId: string;
}

const ConfigContext = createContext<OpenPreviewConfig | null>(null);

export const Config = ConfigContext.Provider;

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a Config");
  }

  return context as OpenPreviewConfig;
};
