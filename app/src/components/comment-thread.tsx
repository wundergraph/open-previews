import React, { useState, KeyboardEvent, Fragment } from "react";
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
      {comment ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={comment?.author?.avatarUrl}
              alt="profile picture"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <a
              href={comment?.author?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {comment?.author?.login}
            </a>
          </div>
          <div>
            <p>{comment?.body?.replace(/<[^>]*>/g, "")}</p>
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
        <Fragment key={index}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={reply.author?.avatarUrl}
              alt="profile picture"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
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
        </Fragment>
      ))}
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
      <div>
        <input
          type="text"
          placeholder="Write a comment..."
          value={input}
          style={{
            width: "100%",
            padding: "5px",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
