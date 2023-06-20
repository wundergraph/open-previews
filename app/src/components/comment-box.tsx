import { styled } from "@macaron-css/react";
import { CommentIcon } from "./icons/comment";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { theme } from "~/theme";
import { PlusIcon } from "./icons/plus";
import { Button } from "./ui/button";
import { style } from "@macaron-css/core";
import { CONTROL_ELEMENT_CLASS } from "~/utils/constants/constants";

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
