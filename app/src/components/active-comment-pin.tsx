import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SelectionRange } from "~/utils/pathBuilder";
import { CommentBox } from "./comment-box";
import { rangy } from "~/utils/rangy";

type Props = {};

export type CommentPinHandle = {
  addCommentPin: (
    element: HTMLElement,
    coords: { x: number; y: number },
    selectionRange?: SelectionRange
  ) => void;
};

export const ActiveCommentPin = forwardRef<CommentPinHandle, Props>(
  (props, ref) => {
    const [pinDetails, setPinDetails] = useState<{
      element: HTMLElement;
      coords: { x: number; y: number };
      selectionRange?: SelectionRange;
    }>();

    const addCommentPin = (
      element: HTMLElement,
      coords: { x: number; y: number },
      selectionRange?: SelectionRange
    ) => {
      setPinDetails({
        element,
        coords,
        selectionRange,
      });
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          addCommentPin,
        };
      },
      []
    );

    if (!pinDetails) return null;

    const rect = pinDetails.element.getBoundingClientRect();
    const left = `${rect.left + pinDetails.coords.x}px`;
    const top = `${rect.top + pinDetails.coords.y}px`;

    let rects: any[] = [];

    if (pinDetails.selectionRange) {
      try {
        const range = rangy.deserializeRange(pinDetails.selectionRange);
        rects = Array.from(range.nativeRange.getClientRects());
      } catch (e) {
        console.error(e);
        // for now do nothing...
      }
    }

    return (
      <div style={{ left, top, position: "fixed" }}>
        <CommentBox />
        {rects.map((each) => {
          return (
            <div
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
      </div>
    );
  }
);
