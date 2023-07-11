import { FC, useMemo, useState } from "react";
import { CommentPopup } from "./comment-popup";
import { rangy } from "~/utils/rangy";
import { Highlight } from "./highlight";
import { PinDetails } from "~/stores/active-pin";
import { NewCommentArgs, NewReplyArgs, ResolveCommentArgs } from "~/App";
import { CommentsWithSelections } from "./selections";
import { User } from "~/hooks/use-user";
import { useDimensions } from "~/hooks/use-dimensions";

type ActiveCommentPinProps = {
  pinDetails: PinDetails;
  onSubmit?: (args: NewCommentArgs) => unknown;
  defaultOpen?: boolean;
  comment?: CommentsWithSelections;
  onReply: (args: NewReplyArgs) => unknown;
  user: User;
  onResolve: (args: ResolveCommentArgs) => unknown;
};

const usePinPosition = (pinDetails: PinDetails) => {
  const dimension = useDimensions()

  let rects = useMemo<DOMRect[]>(() => {
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
    // Dimension needed to update selection when screen is resized / scrolled
  }, [pinDetails.selectionRange, dimension]);

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

  return {
    ...pos,
    rects
  }
}

export type CommentPinHandle = {
  addCommentPin: (args: PinDetails) => void;
};

export const ActiveCommentPin: FC<ActiveCommentPinProps> = ({
  pinDetails,
  onSubmit = (props: NewCommentArgs) => null,
  defaultOpen = false,
  comment,
  onResolve = (props: ResolveCommentArgs) => null,
  onReply = (props: NewReplyArgs) => null,
  user,
}) => {
  const { x, y, rects} = usePinPosition(pinDetails)

  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
        position: "fixed",
        zIndex: open ? "200010" : "200000",
      }}
    >
      <CommentPopup
        onSubmit={onSubmit}
        onReply={onReply}
        onResolve={onResolve}
        defaultOpen={defaultOpen}
        onOpenChange={setOpen}
        comment={comment}
        user={user}
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
