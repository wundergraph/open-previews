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
import { CommentPinHandle } from "~/components/active-comment-pin";

export const addClickListener = (): (() => void) => {
  const listener = async (event: MouseEvent) => {
    if (!$commentMode.get()) {
      // user is not in comment mode - leave the event listener
      return;
    }

    if (event.target && isControlElement(event.target)) {
      return;
    }

    event.preventDefault();

    toggleCommentMode();

    addCommentBox(event);
  };

  document.body.addEventListener("click", listener, false);

  return () => document.body.removeEventListener("click", listener, false);
};

// getSelectedItems().then((items) => {
//   items.forEach((each) => {
//     const clickedElement = findElementFromPath(each.path);
//     if (clickedElement) {
//       addFloatingUI(
//         clickedElement,
//         { x: each.x, y: each.y },
//         each.selectionRange
//       );
//     }
//   });
// });
