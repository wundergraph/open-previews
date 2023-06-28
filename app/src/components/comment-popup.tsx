import { CommentIcon } from "./icons/comment";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  CONTROL_ELEMENT_CLASS,
  DISCUSSION_OPEN_IN_PREVIEW_TEXT,
} from "~/utils/constants/constants";
import { CommentBox } from "./comment-box";
import { NewCommentArgs, NewReplyArgs } from "~/App";
import { CommentThread } from "./comment-thread";
import { CommentsWithSelections } from "./selections";
import { useEffect } from "react";

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
    profilePicURL: string;
    userProfileLink: string;
    username: string;
  };
}) => {
  // Auto-open comment from discussion
  if (comment?.body) {
    const previewlinkRegex = new RegExp(
      `\\[${DISCUSSION_OPEN_IN_PREVIEW_TEXT}]\\(([^)]+)\\)`
    );

    const match = previewlinkRegex.exec(comment.body);
    if (match && match[1]) {
      const url = match[1];
      console.log({ url, hash: window.location.hash });
      if (window.location.hash && url.endsWith(window.location.hash)) {
        defaultOpen = true;
      }
    }
  }

  return (
    <DropdownMenu.Root defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger asChild>
        <button aria-label="open-comments">
          <CommentIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`DropdownMenuContent ${CONTROL_ELEMENT_CLASS}`}
          sideOffset={5}
        >
          {comment ? (
            <CommentThread
              onSend={onReply}
              comment={comment}
              {...userDetails}
            />
          ) : (
            <CommentBox onSubmit={onSubmit} {...userDetails} />
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
