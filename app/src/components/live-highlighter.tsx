import { FC, useEffect, useState } from "react";
import { rangy } from "~/utils/rangy";
import { pathBuilder } from "~/utils/pathBuilder";
import { findElementFromPath } from "~/utils/findElementFromPath";
import { Highlight } from "./highlight";
import { addActiveCommentPin } from "~/utils/state/activeCommentPin";
import { isControlElement } from "~/utils/isControlElement";

export const LiveHighlighter: FC = () => {
  const [isHightlightActive, setIsHighlightActive] = useState(false);
  const [activeRange, setActiveRange] = useState<any>();

  useEffect(() => {
    const liveHighlighter = (event: Event) => {
      if (event.target && isControlElement(event.target)) {
        // Element is part of open previews - do not trigger any highlights
        return;
      }
      const selection = rangy.getSelection();
      if (selection.toString().length) {
        const selectionRange = rangy.serializeSelection(selection, true);
        const range = rangy.deserializeRange(selectionRange);
        setActiveRange(range);
        setIsHighlightActive(true);
      }
    };

    const transitionToComments = (event: MouseEvent) => {
      if (event.target && isControlElement(event.target)) {
        // Element is part of open previews - do not trigger any comments
        return;
      }
      const selection = rangy.getSelection();
      if (selection.toString().length) {
        const targetElement = pathBuilder(event);
        const clickedElement = findElementFromPath(targetElement.path);
        addActiveCommentPin({
          element: clickedElement!,
          coords: {
            x: targetElement.x,
            y: targetElement.y,
          },
          selectionRange: targetElement.selectionRange,
          targetElement,
        });
      }
      setIsHighlightActive(false);
      setActiveRange(undefined);
    };

    document.addEventListener("selectionchange", liveHighlighter);
    document.addEventListener("mouseup", transitionToComments);

    return () => {
      document.removeEventListener("selectionchange", liveHighlighter);
      document.removeEventListener("mouseup", transitionToComments);
    };
  }, []);

  if (!isHightlightActive) return null;

  let rects: DOMRect[] = [];

  if (activeRange) {
    try {
      rects = Array.from(activeRange.nativeRange.getClientRects());
    } catch (e) {
      console.error(e);
      // for now do nothing...
    }
  }

  return (
    <>
      {rects.map((selection, i) => {
        return (
          <Highlight
            key={i}
            style={{
              left: `${selection.left + window.scrollX}px`,
              top: `${selection.top + window.scrollY}px`,
              width: `${selection.width}px`,
              height: `${selection.height}px`,
            }}
          />
        );
      })}
    </>
  );
};
