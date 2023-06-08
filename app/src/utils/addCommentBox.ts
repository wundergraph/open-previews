import { addFloatingUI } from "./addFloatingUI";
import { findElementFromPath } from "./findElementFromPath";
import { pathBuilder } from "./pathBuilder";
import { storage } from "./persistentStorage";

export const addCommentBox = async (
  event: MouseEvent
): Promise<(() => void) | undefined> => {
  const timestamp = new Date();

  const targetElement = pathBuilder(event);

  await storage.setItem(timestamp.toISOString(), targetElement);

  // Find the clicked element and add a floating UI next to it
  const clickedElement = findElementFromPath(targetElement.path);
  if (clickedElement) {
    return addFloatingUI(
      clickedElement,
      { x: targetElement.x, y: targetElement.y },
      targetElement.selectionRange
    );
  }
};
