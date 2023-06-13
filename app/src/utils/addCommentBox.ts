import { CommentPinHandle } from "~/components/active-comment-pin";
import { addFloatingUI } from "./addFloatingUI";
import { findElementFromPath } from "./findElementFromPath";
import { pathBuilder } from "./pathBuilder";
import { storage } from "./persistentStorage";

export const addCommentBox = async (
  event: MouseEvent,
  commentPinHandle: CommentPinHandle | null
) => {
  const targetElement = pathBuilder(event);

  // Find the clicked element and add a floating UI next to it
  const clickedElement = findElementFromPath(targetElement.path);
  if (clickedElement) {
    return commentPinHandle?.addCommentPin({
      element: clickedElement,
      coords: { x: targetElement.x, y: targetElement.y },
      selectionRange: targetElement.selectionRange,
      targetElement,
    });
  }
};
