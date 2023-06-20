import { FC, useState } from "react";
import { CommentBox } from "./comment-box";
import { rangy } from "~/utils/rangy";
import { addSelection } from "~/utils/state/activeSelections";
import { Highlight } from "./highlight";
import { PinDetails } from "~/utils/state/activeCommentPin";

type ActiveCommentPinProps = {
  pinDetails: PinDetails;
  onSubmit?: (data: FormData) => unknown;
  defaultOpen?: boolean;
};

export type CommentPinHandle = {
  addCommentPin: (args: PinDetails) => void;
};

export const ActiveCommentPin: FC<ActiveCommentPinProps> = ({
  pinDetails,
  onSubmit,
  defaultOpen = false,
}) => {
  let rects: DOMRect[] = [];

  if (pinDetails.selectionRange) {
    try {
      const range = rangy.deserializeRange(pinDetails.selectionRange);
      rects = Array.from(range.nativeRange.getClientRects());
    } catch (e) {
      console.error(e);
      // for now do nothing...
    }
  }

  const selection = rects[rects.length - 1];

  let pos = { x: 0, y: 0 };

  if (selection) {
    pos = {
      x: selection.left + selection.width,
      y: selection.top + selection.height,
    };
  } else {
    const rect = pinDetails.element.getBoundingClientRect();
    pos = {
      x: rect.left + pinDetails.coords.x,
      y: rect.top + pinDetails.coords.y,
    };
  }

  const persistCommentBox = async () => {
    if (pinDetails.targetElement) {
      const timestamp = new Date().toISOString();
      addSelection(timestamp, pinDetails.targetElement);
    }
  };

  return (
    <div style={{ left: `${pos.x}px`, top: `${pos.y}px`, position: "fixed" }}>
      <CommentBox
        onSubmit={onSubmit ?? persistCommentBox}
        defaultOpen={defaultOpen}
      />
      {rects.map((rect, i) => {
        return (
          <Highlight
            key={i}
            style={{
              left: `${rect.left + window.scrollX}px`,
              top: `${rect.top + window.scrollY}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
            }}
          />
        );
      })}
    </div>
  );
};
