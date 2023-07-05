import { atom } from "nanostores";
import { MutableRefObject } from "react";
import { ShadowRootHandler } from "~/App";
import { SESSION_STORAGE_WIDGET_ACTIVE } from "../constants/constants";

export const $rootElementReference = atom<
  HTMLElement | MutableRefObject<ShadowRootHandler | null> | null
>(null);

export const setRootElement = (
  element: HTMLElement | MutableRefObject<ShadowRootHandler | null>
) => {
  $rootElementReference.set(element);
};

export const removeOpenPreviewsForSession = () => {
  const root = $rootElementReference.get();
  // @ts-expect-error
  root?.current ? root.current?.unMount() : root?.remove();
  sessionStorage.setItem(SESSION_STORAGE_WIDGET_ACTIVE, "false");
};
