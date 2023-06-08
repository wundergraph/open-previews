import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
} from "./ui/popover";

export const CommentBox = (props) => {
  const { children, onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(new FormData(e.target));
  };

  return (
    <Popover open={true}>
      <PopoverAnchor asChild>
        <div
          style={{
            position: "absolute",
            bottom: "200px",
            zIndex: 2000,
            left: "50%",
          }}
        />
      </PopoverAnchor>
      <PopoverContent sideOffset={5}>
        <form onSubmit={handleSubmit}>
          <textarea name="comment" defaultValue="Comment..." />
          <button type="submit">Save</button>
        </form>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};
