import { styled } from "@macaron-css/react";
import { CommentIcon } from "./icons/comment";
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "./ui/popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { theme } from "~/theme";
import { PlusIcon } from "./icons/plus";
import { Button, IconButton } from "./ui/button";
import { style } from "@macaron-css/core";

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
  open?: boolean;
  onOpenChange?: (open: boolean) => unknown;
}) => {
  const { onSubmit, defaultOpen, open, onOpenChange } = props;

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
    <Popover defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <CommentPin aria-label="open-comments">
          <PlusIcon />
        </CommentPin>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" sideOffset={10}>
        <form onSubmit={handleSubmit}>
          <Textarea
            name="comment"
            placeholder="Write a comment..."
            onKeyUp={handleKeyUp}
          />
          <div
            className={style({ display: "flex", justifyContent: "flex-end" })}
          >
            <Button type="submit">Send</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
