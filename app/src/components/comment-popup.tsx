import { CommentBox } from "./comment-box";
import { NewCommentArgs, NewReplyArgs, ResolveCommentArgs } from "~/App";
import { CommentThread } from "./comment-thread";
import { CommentsWithSelections } from "./selections";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { styled } from "../../styled-system/jsx";
import { PlusIcon } from "./icons/plus";
import { getUrlFromCommentText } from "~/utils/getUrlFromCommentText";
import { useHash } from "~/hooks/use-hash";
import { User } from "~/hooks/use-user";

export const CommentPopup = ({
  onSubmit,
  defaultOpen,
  open,
  comment,
  onReply,
  onResolve,
  onOpenChange,
  user,
  coordinates
}: {
  onSubmit: (data: NewCommentArgs) => unknown;
  defaultOpen?: boolean;
  open?: boolean;
  comment?: CommentsWithSelections;
  onReply: (args: NewReplyArgs) => unknown;
  onResolve: (args: ResolveCommentArgs) => unknown;
  onOpenChange?: (open: boolean) => unknown;
  user: User;
  coordinates: { x: number; y: number };
}) => {
  const [hash] = useHash();

  // Auto-open comment from discussion
  if (comment?.body) {
    const url = getUrlFromCommentText(comment.body) ?? "";
    if (window.location.hash && url.endsWith(window.location.hash)) {
      defaultOpen = true;
    }
  }

  return (
    <Popover key={hash} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <CommentPin aria-label="open-comments" style={{
          position: "absolute",
          top: `${coordinates.y}px`,
          left: `${coordinates.x}px`,
        }}>
          {comment ? comment.replies?.nodes?.length || 1 : <PlusIcon />}
        </CommentPin>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={4}
        p="0"
        overflow="hidden"
        zIndex="200001"
      >
        <PopoverArrow />
        {comment ? (
          <CommentThread
            onResolve={onResolve}
            onSend={onReply}
            comment={comment}
          />
        ) : (
          <CommentBox onSubmit={onSubmit} user={user} />
        )}
      </PopoverContent>
    </Popover>
  );
};

const CommentPin = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "28px",
    width: "28px",
    borderRadius: "100%",
    cursor: "pointer",
    zIndex: "popover",
    fontSize: "sm",
    fontWeight: "medium",
    boxShadow: "md",
    _focusVisible: {
      outline: "none",
      boxShadow: "0 0 0 2px black",
    }
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "gray.600",
        color: "white",
        borderWidth: "2px",
        borderColor: "white",
      },
      new: {
        backgroundColor: "yellow.400",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
