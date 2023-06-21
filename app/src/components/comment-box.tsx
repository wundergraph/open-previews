import { styled } from "@macaron-css/react";
import { CommentIcon } from "./icons/comment";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { theme } from "~/theme";
import { PlusIcon } from "./icons/plus";
import { Button } from "./ui/button";
import { style } from "@macaron-css/core";
import { CONTROL_ELEMENT_CLASS } from "~/utils/constants/constants";
import { useMutation } from "~/lib/wundergraph";

const CommentPin = styled("button", {
  base: {
    all: "unset",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    width: "32px",
    borderRadius: "100%",
    borderTopLeftRadius: 0,
    backgroundColor: theme.color.yellowDark.yellow10,
    cursor: "pointer",
  },
});

const Textarea = styled("textarea", {
  base: {
    border: 0,
    background: "transparent",
    outline: 0,
    color: "white",
    width: "100%",
    fontFamily: "inherit",
    minHeight: "60px",
  },
});

export const CommentBox = (props: {
  onSubmit: (data: FormData) => unknown;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => unknown;
}) => {
  const { onSubmit, defaultOpen, onOpenChange } = props;

  const { trigger } = useMutation({
    operationName: "CreateComment",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    trigger({
      body: "Comment from previews",
      meta: {
        href: "",
        x: 0,
        y: 0,
        selection: "",
      },
      discussionId: "D_kwDOI3kT2M4AUHqB",
      replyToId: "DC_kwDOI3kT2M4AXyjb",
    });

    onSubmit?.(new FormData(e.target));
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <textarea name="comment" defaultValue="Comment..." />
            <button type="submit">Save</button>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
