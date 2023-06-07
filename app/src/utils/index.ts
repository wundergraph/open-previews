import { addFloatingUI } from "./addFloatingUI";
import { findElementFromPath } from "./findElementFromPath";
import { getSelectedItems } from "./getSelectedItems";
import { pathBuilder } from "./pathBuilder";
// import { storage } from "./persistentStorage";
import { rangy } from "./rangy";

rangy.init();

export const addClickListener = (): (() => void) => {
  const listener = async (event: MouseEvent) => {
    const timestamp = new Date();

    const targetElement = pathBuilder(event);
    console.log(targetElement);
    // await storage.setItem(timestamp.toISOString(), targetElement);

    // Find the clicked element and add a floating UI next to it
    const clickedElement = findElementFromPath(targetElement.path);
    if (clickedElement) {
      addFloatingUI(
        clickedElement,
        { x: targetElement.x, y: targetElement.y },
        targetElement.selectionRange
      );
    }
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
