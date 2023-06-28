import { useQuery } from "~/lib/wundergraph";
import { ActiveCommentPin } from "./active-comment-pin";
import { findElementFromPath } from "~/utils/findElementFromPath";
import { NewReplyArgs, ResolveCommentArgs } from "~/App";
import { DISCUSSION_PENDING_STATE } from "~/utils/constants/constants";
import { UserDisplayDetails } from "./comment-thread";

export type CommentMeta = {
  path: string;
  x: number;
  y: number;
  resolved?: boolean;
  selection?: string;
};

export type CommentsQueryData = ReturnType<typeof useQuery<"Comments">>["data"];

export type CommentsDataType = Exclude<
  CommentsQueryData,
  | {
      id: any;
      comments: never[];
    }
  | undefined
>;

export type CommentsWithSelections = Exclude<
  CommentsDataType["comments"],
  undefined
>[0] & {
  selection?: CommentMeta;
};

export const Selections = ({
  data,
  onReply,
  userDetails,
  dimension,
  onResolve,
}: {
  data: CommentsQueryData;
  onReply: (args: NewReplyArgs) => unknown;
  userDetails: UserDisplayDetails;
  dimension: number;
  onResolve: (args: ResolveCommentArgs) => unknown;
}) => {
  const comments: CommentsDataType["comments"] =
    data &&
    (data?.comments as Exclude<(typeof data)["comments"], never[] | undefined>);

  const commentsWithSelections: CommentsWithSelections[] =
    comments?.map((each) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(each.body, "text/html");
      const div = doc.querySelector("div[data-comment-meta]");

      const commentMeta = decodeURIComponent(
        div?.getAttribute("data-comment-meta") ?? ""
      );
      let data: CommentMeta | undefined;
      try {
        data = JSON.parse(commentMeta ?? "{}");
      } catch (e) {
        // do nothing for now - comment meta is invalid
        data = undefined;
      }

      return {
        ...each,
        selection: data,
      };
    }) ?? [];

  const unResolvedCommentsWithSelections = commentsWithSelections.filter(
    (each) => {
      const { body } = each;
      const chunks = body.split(/\n{2,}/) ?? [];
      const metaText = chunks[chunks.length - 1] ?? "";

      return metaText.includes(DISCUSSION_PENDING_STATE);
    }
  );

  return (
    <>
      {unResolvedCommentsWithSelections.map((each) => {
        const selection = each?.selection;
        let path = [];
        try {
          path = JSON.parse(selection?.path ?? "[]");
        } catch {
          // Do nothing for now...
        }
        const clickedElement = findElementFromPath(path) as HTMLElement;

        return (
          <ActiveCommentPin
            pinDetails={{
              element: clickedElement,
              coords: { x: selection?.x ?? 0, y: selection?.y ?? 0 },
              selectionRange: selection?.selection,
            }}
            comment={each}
            userDetails={userDetails}
            onSubmit={() => null}
            dimension={dimension}
            onReply={onReply}
            onResolve={onResolve}
          />
        );
      })}
    </>
  );
};
