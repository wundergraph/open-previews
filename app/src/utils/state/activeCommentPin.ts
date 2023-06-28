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
};

export const $activePinCommentText = atom<string>("");

export const clearActivePinComment = () => {
  $activePinCommentText.set("");
};

export const updateActivePinCommentText = (commentText: string) => {
  $activePinCommentText.set(commentText);
};

export const $activeCommentPin = atom<
  (PinDetails & PinOpenStatus) | PinOpenStatus
>({
  isOpen: false,
});

export const addActiveCommentPin = (arg: PinDetails) => {
  $activeCommentPin.set({
    ...arg,
    isOpen: true,
  });
};

export const removeActiveCommentPin = () => {
  $activeCommentPin.set({ isOpen: false });
};
