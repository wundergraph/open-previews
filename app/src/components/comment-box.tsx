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
    <div
      style={{
        width: "400px",
        maxHeight: "500px",
        overflow: "auto",
        border: "1px solid lightgray",
        borderRadius: "8px",
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor: "#f8f8f8",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <img
          src={profilePicURL}
          alt="profile picture"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <a href={userProfileLink} target="_blank" rel="noopener noreferrer">
          {username}
        </a>
      </div>
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentPinInfo.commentText}
        style={{
          width: "100%",
          padding: "5px",
          boxSizing: "border-box",
          marginBottom: "10px",
        }}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
};
