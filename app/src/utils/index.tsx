import { createRoot } from "react-dom/client";
import { addFloatingUI } from "./addFloatingUI";
import { findElementFromPath } from "./findElementFromPath";
import { getSelectedItems } from "./getSelectedItems";
import { $commentMode, toggleCommentMode } from "./state/commentMode";
import { isControlElement } from "./isControlElement";
import { rangy } from "./rangy";
import { createHighlightDivs } from "./createHighlightDivs";
import { addCommentBox } from "./addCommentBox";
import {
  $liveHighlightedDivs,
  resetLiveHighlightedDivs,
  setLiveHighlightedDivs,
} from "./state/liveHighlightedDivs";

export const addClickListener = (): (() => void) => {
  const listener = async (event: MouseEvent) => {
    if (!$commentMode.get()) {
      // user is not in comment mode - leave the event listener
      return;
    }

    if (event.target && isControlElement(event.target)) {
      return;
    }

    toggleCommentMode();

    addCommentBox(event);
  };

  document.body.addEventListener("click", listener, false);

  return () => document.body.removeEventListener("click", listener, false);
};

getSelectedItems().then((items) => {
  items.forEach((each) => {
    const clickedElement = findElementFromPath(each.path);
    if (clickedElement) {
      addFloatingUI(
        clickedElement,
        { x: each.x, y: each.y },
        each.selectionRange
      );
    }
  });
});

const liveHighlighter = () => {
  if ($liveHighlightedDivs.get().length) {
    clearLiveHighlighter();
  }
  const selection = rangy.getSelection();
  if (selection.toString().length) {
    const selectionRange = rangy.serializeSelection(selection, true);
    const range = rangy.deserializeRange(selectionRange);
    setLiveHighlightedDivs(createHighlightDivs(range));
  }
};

const clearLiveHighlighter = () => {
  const highlightedDivs = $liveHighlightedDivs.get();
  highlightedDivs.forEach((item) => {
    item.remove();
  });
  console.log("calling resetter");
  resetLiveHighlightedDivs();
};

const transitionToComments = (event: MouseEvent) => {
  const isAnyDivHighlighted = !!$liveHighlightedDivs.get().length;
  if (isAnyDivHighlighted) {
    clearLiveHighlighter();
    addCommentBox(event);
  }
};

document.addEventListener("selectionchange", liveHighlighter);
document.addEventListener("mouseup", transitionToComments);
