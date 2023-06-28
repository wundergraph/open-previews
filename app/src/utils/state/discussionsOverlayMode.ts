import { atom } from "nanostores";

export const $discussionsOverlayMode = atom<boolean>(false);

export const toggleDiscussionsOverlayMode = () => {
  $discussionsOverlayMode.set(!$discussionsOverlayMode.get());
};
