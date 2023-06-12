import { SelectionRange } from "./pathBuilder";

import { createHighlightDivs } from "./createHighlightDivs";
import { rangy } from "./rangy";
import { createRoot } from "react-dom/client";
import { CommentBox } from "~/components/comment-box";

export const addFloatingUI = (
  element: HTMLElement,
  coords: { x: number; y: number },
  selectionRange?: SelectionRange
): (() => void) => {
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
    try {
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
    } catch (e) {
      console.error(e);
      // do nothing for now
    }
  }

  const root = createRoot(dummyElement);

  root.render(<CommentBox onSubmit={() => null} />);

  return () => dummyElement.remove();
};
