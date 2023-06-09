import { useQuery } from "~/lib/wundergraph";
import { ActiveCommentPin } from "./active-comment-pin";
import { findElementFromPath } from "~/utils/findElementFromPath";
import { NewReplyArgs, ResolveCommentArgs } from "~/App";
import { DISCUSSION_PENDING_STATE } from "~/utils/constants/constants";
import { useHash } from "~/hooks/use-hash";
import { User } from "~/hooks/use-user";

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
  onResolve,
  user,
}: {
  data: CommentsQueryData;
  onReply: (args: NewReplyArgs) => unknown;
  onResolve: (args: ResolveCommentArgs) => unknown;
  user: User;
}) => {
  const [hash] = useHash();

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

      return (
        metaText.includes(DISCUSSION_PENDING_STATE) ||
        // Add the comment box if the hash is present in the url
        (hash && body.includes(hash))
      );
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
            key={each.id}
            pinDetails={{
              element: clickedElement,
              coords: { x: selection?.x ?? 0, y: selection?.y ?? 0 },
              scroll: { x: window.scrollX, y: window.scrollY },
              selectionRange: selection?.selection,
            }}
            comment={each}
            onSubmit={() => null}
            onReply={onReply}
            onResolve={onResolve}
            user={user}
          />
        );
      })}
    </>
  );
};
