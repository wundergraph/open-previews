import type { PositionData, SelectionRange } from "../utils/pathBuilder";
import { atom } from "nanostores";

export type PinDetails = {
  isOpen?: boolean;
  targetElement?: PositionData;
  element: HTMLElement;
  coords: { x: number; y: number };
  scroll?: { x: number; y: number };
  selectionRange?: SelectionRange;
};

export type PinDetailsActive = {
  isOpen?: boolean;
  targetElement?: PositionData;
  element: HTMLElement;
  coords: { x: number; y: number };
  scroll?: { x: number; y: number };
  selectionRange?: SelectionRange;
};

export type PinDetailsInactive = {
  isOpen: boolean;
};

export type PinDetailsState = PinDetailsActive | PinDetailsInactive;

export const $activePinCommentText = atom<string>("");

export const clearActivePinComment = () => {
  $activePinCommentText.set("");
};

export const updateActivePinCommentText = (commentText: string) => {
  $activePinCommentText.set(commentText);
};

export const $activeCommentPin = atom<PinDetailsState>({
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
