import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { SESSION_STORAGE_WIDGET_ACTIVE } from "~/utils/constants/constants";

export const $widgetActive = atom<boolean>(
  sessionStorage.getItem(SESSION_STORAGE_WIDGET_ACTIVE) !== "false"
);

export const disableWidget = () => {
  $widgetActive.set(!$widgetActive.get());
  sessionStorage.setItem(SESSION_STORAGE_WIDGET_ACTIVE, "false");
};

export const useWidgetActive = () => {
  return useStore($widgetActive);
};
