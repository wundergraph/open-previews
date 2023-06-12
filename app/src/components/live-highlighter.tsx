import { FC, useEffect, useState } from "react";
import { rangy } from "~/utils/rangy";

export const LiveHighlighter: FC = () => {
  const [isHightlightActive, setIsHighlightActive] = useState(false);
  const [activeRange, setActiveRange] = useState<any>();

  useEffect(() => {
    const liveHighlighter = () => {
      const selection = rangy.getSelection();
      if (selection.toString().length) {
        const selectionRange = rangy.serializeSelection(selection, true);
        const range = rangy.deserializeRange(selectionRange);
        setActiveRange(range);
        setIsHighlightActive(true);
      }
    };

    const transitionToComments = (event: MouseEvent) => {
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

  let rects: any[] = [];

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
      {rects.map((each, eachIndex) => {
        return (
          <div
            key={eachIndex.toString()}
            className="highlight"
            style={{
              position: "fixed",
              left: `${each.left + window.scrollX}px`,
              top: `${each.top + window.scrollY}px`,
              width: `${each.width}px`,
              height: `${each.height}px`,
              backgroundColor: "yellow",
              opacity: "0.5",
              pointerEvents: "none",
            }}
          ></div>
        );
      })}
    </>
  );
};
