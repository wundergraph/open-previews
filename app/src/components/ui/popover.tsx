import * as PopoverPrimitives from "@radix-ui/react-popover";
import { styled } from "../../../styled-system/jsx";

export const Popover = styled(PopoverPrimitives.Root, {
  base: {
    zIndex: "popover",
  },
});
export const PopoverTrigger = PopoverPrimitives.Trigger;
export const PopoverAnchor = PopoverPrimitives.Anchor;
export const PopoverPortal = PopoverPrimitives.Portal;

export const PopoverContent = styled(PopoverPrimitives.Content, {
  base: {
    borderRadius: "4px",
    padding: "8px",
    minWidth: "260px",
    backgroundColor: "bg.surface",
    backdropFilter: "blur(20px)",
    border: "1px solid",
    borderColor: "border.default",
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    fontSize: "sm",
    _focusVisible: { outline: "none" },
    "&[data-state=open]": {
      opacity: 1,
      transform: "translateY(0)",
      '&[data-side="top"]': { animationName: "slideDownAndFade" },
      '&[data-side="right"]': { animationName: "slideLeftAndFade" },
      '&[data-side="bottom"]': { animationName: "slideUpAndFade" },
      '&[data-side="left"]': { animationName: "slideRightAndFade" },
    },
  },
});

export const PopoverArrow = styled(PopoverPrimitives.Arrow, {
  base: {
    fill: "bg.surface",
  },
});

export const PopoverClose = styled(PopoverPrimitives.Close, {
  base: {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: 25,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "green.500",
    position: "absolute",
    top: 5,
    right: 5,
    _hover: { backgroundColor: "green.400" },
    _focus: { boxShadow: "0 0 0 2px token(colors.green.300)" },
  },
});
