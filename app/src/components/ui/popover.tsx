import { styled } from "@macaron-css/react";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { theme } from "~/theme";

// const slideUpAndFade = keyframes({
//     '0%': { opacity: 0, transform: 'translateY(2px)' },
//     '100%': { opacity: 1, transform: 'translateY(0)' },
//   });

//   const slideRightAndFade = keyframes({
//     '0%': { opacity: 0, transform: 'translateX(-2px)' },
//     '100%': { opacity: 1, transform: 'translateX(0)' },
//   });

//   const slideDownAndFade = keyframes({
//     '0%': { opacity: 0, transform: 'translateY(-2px)' },
//     '100%': { opacity: 1, transform: 'translateY(0)' },
//   });

//   const slideLeftAndFade = keyframes({
//     '0%': { opacity: 0, transform: 'translateX(2px)' },
//     '100%': { opacity: 1, transform: 'translateX(0)' },
//   });

export const Popover = PopoverPrimitives.Root;
export const PopoverTrigger = PopoverPrimitives.Trigger;
export const PopoverAnchor = PopoverPrimitives.Anchor;
export const PopoverPortal = PopoverPrimitives.Portal;

export const PopoverContent = styled(PopoverPrimitives.Content, {
  base: {
    zIndex: theme.zIndex.base,
    borderRadius: 4,
    padding: 8,
    width: 260,
    backgroundColor: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(20px)",
    border: "1px solid",
    borderColor: theme.color.grayDarkA.grayA10,
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    selectors: {
      "&[data-state=open]": {
        opacity: 1,
        transform: "translateY(0)",
        //   '&[data-side="top"]': { animationName: slideDownAndFade },
        //   '&[data-side="right"]': { animationName: slideLeftAndFade },
        //   '&[data-side="bottom"]': { animationName: slideUpAndFade },
        //   '&[data-side="left"]': { animationName: slideRightAndFade },
      },
    },
  },
});

export const PopoverArrow = styled(PopoverPrimitives.Arrow, {
  base: {
    fill: "white",
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
    color: theme.color.green.green11,
    position: "absolute",
    top: 5,
    right: 5,
    ":hover": { backgroundColor: theme.color.green.green11 },
    ":focus": { boxShadow: `0 0 0 2px ${theme.color.green.green7}` },
  },
});
