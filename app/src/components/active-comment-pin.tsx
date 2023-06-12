import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { PositionData, SelectionRange } from "~/utils/pathBuilder";
import { CommentBox } from "./comment-box";
import { rangy } from "~/utils/rangy";
import { storage } from "~/utils/persistentStorage";

type PinDetails = {
  targetElement: PositionData;
  element: HTMLElement;
  coords: { x: number; y: number };
  selectionRange?: SelectionRange;
};

type ActiveCommentPinProps = {
  pinDetails?: PinDetails;
};

export type CommentPinHandle = {
  addCommentPin: (args: PinDetails) => void;
};

export const ActiveCommentPin = forwardRef<
  CommentPinHandle,
  ActiveCommentPinProps
>((props, ref) => {
  const [pinDetails, setPinDetails] = useState<PinDetails | undefined>(
    props.pinDetails
  );

  const addCommentPin = ({
    element,
    coords,
    targetElement,
    selectionRange,
  }: PinDetails) => {
    setPinDetails({
      element,
      coords,
      selectionRange,
      targetElement,
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

  const persistCommentBox = async () => {
    const timestamp = new Date();
    await storage.setItem(timestamp.toISOString(), pinDetails.targetElement);
  };

  return (
    <div style={{ left, top, position: "fixed" }}>
      <CommentBox onSubmit={persistCommentBox} />
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
    </div>
  );
});
