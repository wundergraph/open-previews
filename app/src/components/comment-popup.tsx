import {
  CONTROL_ELEMENT_CLASS,
  DISCUSSION_OPEN_IN_PREVIEW_TEXT,
} from "~/utils/constants/constants";
import { CommentBox } from "./comment-box";
import { NewCommentArgs, NewReplyArgs, ResolveCommentArgs } from "~/App";
import { CommentThread, UserDisplayDetails } from "./comment-thread";
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

export const CommentPopup = ({
  onSubmit,
  defaultOpen,
  comment,
  onReply,
  onResolve,
  userDetails,
}: {
  onSubmit: (data: NewCommentArgs) => unknown;
  defaultOpen?: boolean;
  comment?: CommentsWithSelections;
  onReply: (args: NewReplyArgs) => unknown;
  onResolve: (args: ResolveCommentArgs) => unknown;
  userDetails: UserDisplayDetails;
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
    <Popover key={hash} defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <CommentPin aria-label="open-comments">
          {comment ? comment.replies?.nodes?.length || 1 : <PlusIcon />}
        </CommentPin>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={4}
        p="0"
        className={`DropdownMenuContent ${CONTROL_ELEMENT_CLASS}`}
      >
        <PopoverArrow />
        {comment ? (
          <CommentThread
            onResolve={onResolve}
            onSend={onReply}
            comment={comment}
            {...userDetails}
          />
        ) : (
          <CommentBox onSubmit={onSubmit} {...userDetails} />
        )}
      </PopoverContent>
    </Popover>
  );
};
