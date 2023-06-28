import React, {
  useState,
  KeyboardEvent,
  Fragment,
  useRef,
  useEffect,
} from "react";
import { CommentsWithSelections } from "./selections";
import { NewReplyArgs, ResolveCommentArgs } from "~/App";
import {
  DISCUSSION_PENDING_STATE,
  DISCUSSION_RESOLVED_STATE,
} from "~/utils/constants/constants";
import { cleanCommentText } from "~/utils/cleanCommentText";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
            <p>{cleanCommentText(comment.body)}</p>
          </div>
          {username === comment.author?.login ? (
            <div>
              <button onClick={resolveComment}>
                {isResolved ? `Mark as Pending ⏳` : `Mark as Resolved ✅`}
              </button>
            </div>
          ) : null}
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
          ref={inputRef}
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
