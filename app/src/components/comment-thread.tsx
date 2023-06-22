import React, { useState, KeyboardEvent } from "react";
import { CommentsWithSelections } from "./selections";
import { NewReplyArgs } from "~/App";

interface CommentType {
  username: string;
  content: string;
  profilePicURL: string;
  userProfileLink: string;
}

interface CommentProps {
  username: string;
  profilePicURL: string;
  userProfileLink: string;
  comment?: CommentsWithSelections;
  onSend: (args: NewReplyArgs) => unknown;
}

export const CommentThread: React.FC<CommentProps> = ({
  username,
  profilePicURL,
  userProfileLink,
  comment,
  onSend,
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  console.log({ comment });

  const handleSend = () => {
    onSend({
      comment: input,
      replyToId: comment?.id ?? "",
    });
    setInput("");
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "grey",
        height: "150px",
        width: "75px",
      }}
    >
      {comment ? (
        <>
          <div>
            <img src={comment?.author?.avatarUrl} alt="profile picture" />
            <a
              href={comment?.author?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {comment?.author?.login}
            </a>
          </div>
          <div>
            <p>{comment?.body}</p>
          </div>
          <div>
            <button>Like</button>
          </div>
          <div>
            <p>Total comments: {(comment.replies.nodes?.length ?? 0) + 1}</p>
          </div>
        </>
      ) : null}

      {comment?.replies?.nodes?.map((reply, index) => (
        <div key={index}>
          <div>
            <img src={reply.author?.avatarUrl} alt="profile picture" />
            <a
              href={reply.author?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {reply.author?.login}
            </a>
          </div>
          <div>
            <p>{reply.body}</p>
          </div>
          <div>
            <button>Like</button>
            <button>Reply</button>
          </div>
        </div>
      ))}
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
          value={input}
          style={{ color: "black" }}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
