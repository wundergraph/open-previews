import * as ScrollArea from "@radix-ui/react-scroll-area";
import { CommentsDataType } from "./selections";
import { FC } from "react";
import { cleanCommentText } from "~/utils/cleanCommentText";
import { getUrlFromCommentText } from "~/utils/getUrlFromCommentText";
import { DISCUSSION_RESOLVED_STATE } from "~/utils/constants/constants";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export interface AllDiscussionsProps {
  comments: CommentsDataType["comments"];
}

export const AllDiscussions: FC<AllDiscussionsProps> = ({ comments }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        maxWidth: "200px",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <div className="Text">All Discussions</div>
      {comments?.map((comment) => {
        const url = getUrlFromCommentText(comment.body);
        let pathname: string | undefined;
        try {
          let urlObject = new URL(url ?? "");
          pathname = urlObject.pathname;
        } catch {
          // do nothing
        }
        return (
          <a href={url} key={comment.id}>
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
              <span>{comment?.author?.login}</span>
            </div>
            <p>
              Route: {pathname}
              Status:
              {comment.body.includes(DISCUSSION_RESOLVED_STATE) ? "✅" : "⏳"}
            </p>
            <p>{cleanCommentText(comment.body)}</p>
          </a>
        );
      })}
    </div>
  );
};
