import { findElementFromPath } from "./findElementFromPath";
import { pathBuilder } from "./pathBuilder";
import { addActiveCommentPin } from "../stores/active-pin";

export const addCommentBox = async (event: MouseEvent) => {
  const targetElement = pathBuilder(event);

  // Find the clicked element and add a floating UI next to it
  const clickedElement = findElementFromPath(targetElement.path);
  if (clickedElement) {
    return addActiveCommentPin({
      element: clickedElement,
      coords: { x: targetElement.x, y: targetElement.y },
      scroll: { x: window.scrollX, y: window.scrollY },
      selectionRange: targetElement.selectionRange,
      targetElement,
    });
  }
};
