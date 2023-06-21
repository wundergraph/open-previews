import { CommentIcon } from "./icons/comment";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CONTROL_ELEMENT_CLASS } from "~/utils/constants/constants";
import { CommentBox } from "./comment-box";
import { NewCommentArgs } from "~/App";

export const CommentPopup = ({
  onSubmit,
  defaultOpen,
  comments,
  userDetails,
}: {
  onSubmit: (data: NewCommentArgs) => unknown;
  defaultOpen?: boolean;
  comments?: string[];
  userDetails: {
    profilePicURL: string;
    userProfileLink: string;
    username: string;
  };
}) => {
  // const { trigger } = useMutation({
  //   operationName: "CreateComment",
  // });

  // trigger({
  //   body: "Comment from previews",
  //   meta: {
  //     path: "",
  //     x: 0,
  //     y: 0,
  //     selection: "",
  //   },
  //   discussionId: "D_kwDOI3kT2M4AUHqB",
  // replyToId: "DC_kwDOI3kT2M4AXyjb",
  // });

  return (
    <DropdownMenu.Root defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger asChild>
        <button aria-label="open-comments">
          <CommentIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`DropdownMenuContent ${CONTROL_ELEMENT_CLASS}`}
          sideOffset={5}
        >
          {comments ? (
            <div></div>
          ) : (
            <CommentBox onSubmit={onSubmit} {...userDetails} />
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
