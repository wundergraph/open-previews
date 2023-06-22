import { FC, useMemo } from "react";
import { CommentPopup } from "./comment-popup";
import { rangy } from "~/utils/rangy";
import { Highlight } from "./highlight";
import { PinDetails } from "~/utils/state/activeCommentPin";
import { NewCommentArgs, NewReplyArgs } from "~/App";
import { CommentsWithSelections } from "./selections";

type ActiveCommentPinProps = {
  pinDetails: PinDetails;
  onSubmit?: (args: NewCommentArgs) => unknown;
  defaultOpen?: boolean;
  comment?: CommentsWithSelections;
  onReply: (args: NewReplyArgs) => unknown;
  userDetails: {
    profilePicURL: string;
    userProfileLink: string;
    username: string;
  };
};

export type CommentPinHandle = {
  addCommentPin: (args: PinDetails) => void;
};

export const ActiveCommentPin: FC<ActiveCommentPinProps> = ({
  pinDetails,
  onSubmit = (props: NewCommentArgs) => null,
  defaultOpen = false,
  comment,
  userDetails,
  onReply = (props: NewReplyArgs) => null,
}) => {
  let rects: DOMRect[] = [];

  rects = useMemo(() => {
    if (pinDetails.selectionRange) {
      try {
        const range = rangy.deserializeRange(pinDetails.selectionRange);
        return Array.from(range.nativeRange.getClientRects());
      } catch {
        // for now do nothing...
        return [];
      }
    }
    return [];
  }, [pinDetails.selectionRange]);

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

  return (
    <div style={{ left: `${pos.x}px`, top: `${pos.y}px`, position: "fixed" }}>
      <CommentPopup
        onSubmit={onSubmit}
        onReply={onReply}
        defaultOpen={defaultOpen}
        comment={comment}
        userDetails={userDetails}
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
