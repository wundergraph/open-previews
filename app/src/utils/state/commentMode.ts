import { atom } from "nanostores";

export const $commentMode = atom<boolean>(false);

export const toggleCommentMode = () => {
  $commentMode.set(!$commentMode.get());
};
