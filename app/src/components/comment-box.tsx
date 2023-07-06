import { useStore } from "@nanostores/react";
import React, { ChangeEvent, FC, KeyboardEvent, useEffect } from "react";
import { NewCommentArgs } from "~/App";
import {
  $activePinCommentText,
  clearActivePinComment,
  removeActiveCommentPin,
  updateActivePinCommentText,
} from "~/stores/active-pin";
import { Button } from "./ui/button";
import { Textarea } from "./ui/forms";
import { Avatar } from "./ui/avatar";
import { Box, Flex, Stack } from "../../styled-system/jsx";
import { User } from "~/hooks/use-user";

export interface CommentBoxProps {
  onSubmit: (data: NewCommentArgs) => unknown;
  user: User;
}

export const CommentBox: FC<CommentBoxProps> = ({ onSubmit, user }) => {
  // lazy render the textarea otherwise we loose focus and the selection is lost.
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 50);
  }, []);

  const commentText = useStore($activePinCommentText);

  const onSend = () => {
    removeActiveCommentPin();
    clearActivePinComment();
    onSubmit({
      comment: commentText,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateActivePinCommentText(event.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box bg="bg.subtle" borderBottom="1px solid" borderColor="border.default">
      <Stack
        py="8px"
        px="12px"
        direction="row"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.default"
      >
        <Avatar src={user.avatar} name={user.name || user.username} />
        <a
          href={`https://github.com/${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.username}
        </a>
      </Stack>
      {show && (
        <Textarea
          autoFocus
          placeholder="Write a comment..."
          value={commentText}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
      )}
      <Flex flexDirection="row" justifyContent="flex-end" py="4px" px="12px">
        <Button onClick={onSend}>Send</Button>
      </Flex>
    </Box>
  );
};
