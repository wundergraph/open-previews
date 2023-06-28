import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled } from "../../../styled-system/jsx";
import { SystemStyleObject } from "../../../styled-system/types";

const contentStyles: SystemStyleObject = {
  width: "220px",
  backgroundColor: "white",
  borderRadius: "md",
  padding: "2",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: "slideDownAndFade" },
    '&[data-side="right"]': { animationName: "slideLeftAndFade" },
    '&[data-side="bottom"]': { animationName: "slideUpAndFade" },
    '&[data-side="left"]': { animationName: "slideRightAndFade" },
  },
};

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  base: contentStyles,
});
export const DropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent, {
  base: contentStyles,
});

export const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  base: { fill: "white" },
});

const itemStyles: SystemStyleObject = {
  fontSize: "sm",
  lineHeight: 1,
  color: "fg.emphasized",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: "24px",
  padding: "0 5px",
  position: "relative",
  paddingLeft: "24px",
  userSelect: "none",
  outline: "none",
  cursor: "pointer",

  "&[data-disabled]": {
    color: "fg.muted",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "bg.muted",
    color: "fg.default",
  },
};

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  base: itemStyles,
});
export const DropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  {
    base: itemStyles,
  }
);
export const DropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  base: itemStyles,
});
export const DropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger, {
  base: {
    '&[data-state="open"]': {
      backgroundColor: "accent.default",
      color: "accent.subtle",
    },
    ...itemStyles,
  },
});

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {
  base: {
    paddingLeft: "24px",
    fontSize: "sm",
    lineHeight: "24px",
    color: "fg.default",
  },
});

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  base: {
    height: "1px",
    backgroundColor: "bg.subtle",
    margin: "5px",
  },
});

export const DropdownMenuItemIndicator = styled(
  DropdownMenuPrimitive.ItemIndicator,
  {
    base: {
      position: "absolute",
      left: 0,
      width: "24px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }
);

export const DropdownMenuIcon = styled("span", {
  base: {
    marginLeft: "-16px",
    marginRight: "8px",
  },
});
