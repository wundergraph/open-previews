import { useStore } from "@nanostores/react";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from "react";
import { NewCommentArgs } from "~/App";
import {
  $activePinCommentText,
  clearActivePinComment,
  removeActiveCommentPin,
  updateActivePinCommentText,
} from "~/utils/state/activeCommentPin";
import { Button } from "./ui/button";
import { Textarea } from "./ui/forms";
import { Avatar } from "./ui/avatar";
import { Stack } from "../../styled-system/jsx";

export interface CommentBoxProps {
  onSubmit: (data: NewCommentArgs) => unknown;
  profilePicture: string;
  username: string;
}

export const CommentBox: FC<CommentBoxProps> = ({
  onSubmit,
  profilePicture,
  username,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
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
    <div>
      <Stack mb="10px" direction="row" alignItems="center">
        <Avatar src="profilePicture" name={username} />
        <span>{username}</span>
      </Stack>
      <Textarea
        ref={inputRef}
        placeholder="Write a comment..."
        value={commentText}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <Button onClick={onSend}>Send</Button>
    </div>
  );
};
