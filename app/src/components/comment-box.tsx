import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
} from "./ui/popover";

export const CommentBox = (props) => {
  const { children } = props;
  return (
    <Popover defaultOpen>
      <PopoverAnchor>
        <div />
      </PopoverAnchor>
      <PopoverPortal>
        <PopoverContent sideOffset={5}>
          <textarea defaultValue="Comment..." />
          <button>Save</button>
          <PopoverArrow />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
