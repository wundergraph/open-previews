import { CommentIcon } from "./icons/comment";
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
} from "./ui/popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const CommentBox = (props) => {
  const { children, onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(new FormData(e.target));
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="open-comments">
          <CommentIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <form onSubmit={handleSubmit}>
            <textarea name="comment" defaultValue="Comment..." />
            <button type="submit">Save</button>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
