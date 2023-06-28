import { CONTROL_ELEMENT_CLASS } from "~/utils/constants/constants";
import { CommentBox } from "./comment-box";
import { NewCommentArgs, NewReplyArgs } from "~/App";
import { CommentThread } from "./comment-thread";
import { CommentsWithSelections } from "./selections";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { styled } from "../../styled-system/jsx";
import { PlusIcon } from "./icons/plus";

const CommentPin = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "28px",
    width: "28px",
    borderRadius: "100%",
    backgroundColor: "yellow.400",
    cursor: "pointer",
    zIndex: "popover",
  },
});

export const CommentPopup = ({
  onSubmit,
  defaultOpen,
  comment,
  onReply,
  userDetails,
}: {
  onSubmit: (data: NewCommentArgs) => unknown;
  defaultOpen?: boolean;
  comment?: CommentsWithSelections;
  onReply: (args: NewReplyArgs) => unknown;
  userDetails: {
    profilePicture: string;
    username: string;
  };
}) => {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <CommentPin aria-label="open-comments">
          <PlusIcon />
        </CommentPin>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={10}
        className={`DropdownMenuContent ${CONTROL_ELEMENT_CLASS}`}
      >
        {comment ? (
          <CommentThread onSend={onReply} comment={comment} {...userDetails} />
        ) : (
          <CommentBox onSubmit={onSubmit} {...userDetails} />
        )}
      </PopoverContent>
    </Popover>
  );
};
