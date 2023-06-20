import { $commentMode, toggleCommentMode } from "./state/commentMode";
import { isControlElement } from "./isControlElement";
import { addCommentBox } from "./addCommentBox";
import { removeActiveCommentPin } from "./state/activeCommentPin";

export const addClickListener = (): (() => void) => {
  const listener = async (event: MouseEvent) => {
    if (event.target && isControlElement(event.target)) {
      // Element is part of open previews - do not trigger any events
      return;
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
