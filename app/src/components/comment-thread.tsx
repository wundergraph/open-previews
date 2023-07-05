import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { CommentsWithSelections } from "./selections";
import { NewReplyArgs, ResolveCommentArgs } from "~/App";
import {
  DISCUSSION_PENDING_STATE,
  DISCUSSION_RESOLVED_STATE,
} from "~/utils/constants/constants";
import { cleanCommentText } from "~/utils/cleanCommentText";
import { Avatar } from "./ui/avatar";
import { Box, Flex, Stack } from "../../styled-system/jsx";
import { Link, Text } from "./ui/layout";
import { Button, IconButton } from "./ui/button";
import { Textarea } from "./ui/forms";
import { ReplyIcon } from "./icons/reply";
import { LikeIcon } from "./icons/like";
import { CheckIcon } from "./icons/check";
import { PendingIcon } from "./icons/pending";
import { Tooltip } from "./ui/tooltip";

interface CommentType {
  username: string;
  content: string;
  profilePicURL: string;
  userProfileLink: string;
}

export interface UserDisplayDetails {
  username: string;
  profilePicURL: string;
  userProfileLink: string;
}

type CommentProps = {
  comment?: CommentsWithSelections;
  onSend: (args: NewReplyArgs) => unknown;
  onResolve: (args: ResolveCommentArgs) => unknown;
} & UserDisplayDetails;

export const CommentThread: React.FC<CommentProps> = ({
  username,
  profilePicURL,
  userProfileLink,
  comment,
  onSend,
  onResolve,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    onSend({
      comment: input,
      replyToId: comment?.id ?? "",
    });
    setInput("");
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isResolved = comment?.body.includes(DISCUSSION_RESOLVED_STATE);

  const resolveComment = () => {
    const updatedBody = isResolved
      ? comment?.body.replace(
          DISCUSSION_RESOLVED_STATE,
          DISCUSSION_PENDING_STATE
        ) ?? ""
      : comment?.body.replace(
          DISCUSSION_PENDING_STATE,
          DISCUSSION_RESOLVED_STATE
        ) ?? "";

    onResolve({
      comment: updatedBody,
      id: comment?.id ?? "",
    });
  };

  return (
    <div>
      {comment ? (
        <Box
          bg="bg.subtle"
          borderBottom="1px solid"
          borderColor="border.default"
          py="8px"
          px="12px"
        >
          <Stack mb="8px" direction="row" alignItems="center">
            <Avatar
              src={comment?.author?.avatarUrl}
              name={comment?.author?.login}
              size="sm"
            />

            <Link
              href={comment?.author?.url}
              target="_blank"
              rel="noopener noreferrer"
              color="fg.default"
              fontWeight="medium"
            >
              {comment?.author?.login}
            </Link>

            <Stack direction="row" flex="1" justifyContent="flex-end">
              <Tooltip
                tooltip={isResolved ? `Mark as Pending` : `Mark as Resolved`}
              >
                <IconButton
                  onClick={resolveComment}
                  aria-label={
                    isResolved ? `Mark as Pending` : `Mark as Resolved`
                  }
                >
                  {isResolved ? <CheckIcon /> : <PendingIcon />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <div>
            <p>{cleanCommentText(comment.body)}</p>
          </div>
          <Text color="fg.muted" fontSize="sm">
            {comment.replies.nodes?.length ?? 0} replies
          </Text>
        </Box>
      ) : null}

      {comment?.replies?.nodes?.map((reply, index) => (
        <Box
          bg="bg.subtle"
          borderBottom="1px solid"
          borderColor="border.default"
          py="8px"
          px="12px"
          key={index}
        >
          <Stack mb="8px" direction="row" alignItems="center">
            <Avatar
              src={reply?.author?.avatarUrl}
              name={reply?.author?.login}
              size="sm"
            />

            <Link
              href={reply?.author?.url}
              target="_blank"
              rel="noopener noreferrer"
              color="fg.default"
              fontWeight="medium"
            >
              {reply?.author?.login}
            </Link>

            <Stack direction="row" flex="1" justifyContent="flex-end" gap="4px">
              <IconButton aria-label="Like">
                <LikeIcon />
              </IconButton>
              <IconButton aria-label="Reply">
                <ReplyIcon />
              </IconButton>
            </Stack>
          </Stack>
          <div>
            <p>{reply.body}</p>
          </div>
        </Box>
      ))}

      <div>
        <Textarea
          ref={inputRef}
          placeholder="Write a comment..."
          value={input}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <Flex flexDirection="row" justifyContent="flex-end" py="4px" px="8px">
          <Button onClick={handleSend}>Send</Button>
        </Flex>
      </div>
    </div>
  );
};
