import { atom } from "nanostores";

export const $liveHighlightedDivs = atom<HTMLDivElement[]>([]);

export const setLiveHighlightedDivs = (divs: HTMLDivElement[]) => {
  $liveHighlightedDivs.set(divs);
};

export const resetLiveHighlightedDivs = () => {
  $liveHighlightedDivs.set([]);
};
