import { useStore } from "@nanostores/react";
import { ChangeEvent, FC, KeyboardEvent } from "react";
import { NewCommentArgs } from "~/App";
import {
  $activeCommentPin,
  clearActivePinComment,
  removeActiveCommentPin,
  updateActivePinCommentText,
} from "~/utils/state/activeCommentPin";

export interface CommentBoxProps {
  onSubmit: (data: NewCommentArgs) => unknown;
  profilePicURL: string;
  userProfileLink: string;
  username: string;
}

export const CommentBox: FC<CommentBoxProps> = ({
  onSubmit,
  profilePicURL,
  userProfileLink,
  username,
}) => {
  const commentPinInfo = useStore($activeCommentPin);

  const onSend = () => {
    removeActiveCommentPin();
    clearActivePinComment();
    onSubmit({
      comment: commentPinInfo.commentText,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateActivePinCommentText(event.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div>
      <div>
        <img src={profilePicURL} alt="profile picture" />
        <a href={userProfileLink} target="_blank" rel="noopener noreferrer">
          {username}
        </a>
      </div>
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentPinInfo.commentText}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        style={{ color: "black" }}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
};
