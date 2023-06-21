import React, { useState } from "react";

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
  comments?: CommentType[];
  onSend: (content: string) => void;
}

export const CommentThread: React.FC<CommentProps> = ({
  username,
  profilePicURL,
  userProfileLink,
  comments,
  onSend,
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <div>
              <img src={comment.profilePicURL} alt="profile picture" />
              <a
                href={comment.userProfileLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {comment.username}
              </a>
            </div>
            <div>
              <p>{comment.content}</p>
            </div>
            <div>
              <button>Like</button>
              <button>Reply</button>
            </div>
            {index === 0 && (
              <div>
                <p>Total comments: {comments.length}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>
          <img src={profilePicURL} alt="profile picture" />
          <a href={userProfileLink} target="_blank" rel="noopener noreferrer">
            {username}
          </a>
        </div>
      )}
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
          onChange={handleInputChange}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
