import type { PositionData, SelectionRange } from "../pathBuilder";
import { atom } from "nanostores";

export type PinDetails = {
  targetElement?: PositionData;
  element: HTMLElement;
  coords: { x: number; y: number };
  selectionRange?: SelectionRange;
};

type PinOpenStatus = {
  isOpen: boolean;
  commentText: string;
};

export const $activeCommentPin = atom<
  (PinDetails & PinOpenStatus) | PinOpenStatus
>({
  isOpen: false,
  commentText: "",
});

export const addActiveCommentPin = (arg: PinDetails) => {
  const commentText = $activeCommentPin.get().commentText;
  $activeCommentPin.set({
    ...arg,
    isOpen: true,
    commentText,
  });
};

export const removeActiveCommentPin = () => {
  const commentText = $activeCommentPin.get().commentText;
  $activeCommentPin.set({ isOpen: false, commentText });
};

export const clearActivePinComment = () => {
  $activeCommentPin.set({
    ...$activeCommentPin.get(),
    commentText: "",
  });
};

export const updateActivePinCommentText = (commentText: string) => {
  $activeCommentPin.set({
    ...$activeCommentPin.get(),
    commentText,
  });
};
