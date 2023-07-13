import { $commentMode, toggleCommentMode } from "../stores/comment-mode";
import { isControlElement } from "./isControlElement";
import { addCommentBox } from "./addCommentBox";
import { removeActiveCommentPin } from "../stores/active-pin";
import {
  $discussionsOverlayMode,
  toggleDiscussionsOverlayMode,
} from "../stores/discussions-overlay-mode";

export const addClickListener = (): (() => void) => {
  const listener = async (event: MouseEvent) => {
    if (event.target && isControlElement(event.target)) {
      // Element is part of open previews - do not trigger any events
      return;
    }

    if ($discussionsOverlayMode.get()) {
      // discussions overlay is active - close the overlay to ensure the rest of the page is usable
      toggleDiscussionsOverlayMode();
    }

    if (!$commentMode.get()) {
      // user is not in comment mode - leave the event listener
      // also clear any active pins - since click was made on the body of the page
      if (window.getSelection()?.type !== "Range") removeActiveCommentPin();
      return;
    }

    event.preventDefault();

    toggleCommentMode();

    addCommentBox(event);
  };

  document.body.addEventListener("click", listener, false);

  return () => document.body.removeEventListener("click", listener, false);
};
