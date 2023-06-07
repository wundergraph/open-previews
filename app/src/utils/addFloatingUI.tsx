import { SelectionRange } from "./pathBuilder";

import { rangy } from "./rangy";

import { createHighlightDivs } from "./createHighlightDivs";
import { CommentBox } from "~/components/comment-box";
import { createRoot } from "react-dom/client";

rangy.init();

export const addFloatingUI = (
  element: HTMLElement,
  coords: { x: number; y: number },
  selectionRange?: SelectionRange
): void => {
  const dummyElement = document.createElement("div");
  dummyElement.style.position = "fixed";

  // Function to update the position of the dummy element
  const updatePosition = () => {
    const rect = element.getBoundingClientRect();
    dummyElement.style.left = `${rect.left + coords.x}px`;
    dummyElement.style.top = `${rect.top + coords.y}px`;
  };

  updatePosition();
  document.body.appendChild(dummyElement);

  // Listen to resize and scroll events
  window.addEventListener("resize", updatePosition);
  window.addEventListener("scroll", updatePosition);

  if (selectionRange) {
    const range = rangy.deserializeRange(selectionRange);
    let highlightDivs = createHighlightDivs(range);

    window.addEventListener("resize", () => {
      highlightDivs.forEach((item) => {
        item.remove();
      });
      highlightDivs = createHighlightDivs(range);
    });
    window.addEventListener("scroll", () => {
      highlightDivs.forEach((item) => {
        item.remove();
      });
      highlightDivs = createHighlightDivs(range);
    });
    // Rangy's default way to highlight div - edits existing DOM so disabled
    // highlightClassApplier.applyToRange(range);
  }

  // if (selectionRange?.selectedText) {
  //   const before = element.textContent?.substring(0, selectionRange.start!);
  //   const selected = element.textContent?.substring(
  //     selectionRange.start!,
  //     selectionRange.end!
  //   );
  //   const after = element.textContent?.substring(selectionRange.end!);

  //   // Clear the element's existing content
  //   element.textContent = "";

  //   // Create a new text node for the text before the selection
  //   element.appendChild(document.createTextNode(before || ""));

  //   // Create a new span element for the selected text
  //   const span = document.createElement("span");
  //   span.className = "highlight";
  //   span.textContent = selected ?? "";
  //   element.appendChild(span);

  //   // Create a new text node for the text after the selection
  //   element.appendChild(document.createTextNode(after || ""));
  // }

  createRoot(dummyElement).render(<CommentBox />);
};
