import React from "react";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";
import { styled } from "../../../styled-system/jsx";

export const TooltipProvider = TooltipPrimitives.TooltipProvider

const TooltipContent = styled(TooltipPrimitives.Content, {
  base: {
    borderRadius: "4px",
    padding: "6px 10px",
    lineHeight: 1,
    color: "fg.default",
    bg: "bg.surface",
    fontSize: "xs",
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    userSelect: "none",
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: "slideDownAndFade" },
      '&[data-side="right"]': { animationName: "slideLeftAndFade" },
      '&[data-side="bottom"]': { animationName: "slideUpAndFade" },
      '&[data-side="left"]': { animationName: "slideRightAndFade" },
    },
  },
});

const TooltipArrow = styled(TooltipPrimitives.Arrow, {
  base: {
    fill: "white",
  },
});

export const Tooltip = ({ children, tooltip }) => {
  const container = document
    .getElementsByTagName("open-previews")[0]
    .shadowRoot?.getElementById("open-previews-container");

  const [open, setOpen] = React.useState(false);

  return (
    <TooltipPrimitives.Root open={open} onOpenChange={(open) => {
      if (open === false) {
        return setTimeout(() => {
          setOpen(open)
        }, 100)
      }
      setOpen(true)
    }}>
      <TooltipPrimitives.Trigger asChild>
        {children}
      </TooltipPrimitives.Trigger>
      <TooltipPrimitives.Portal container={container}>
        <TooltipContent sideOffset={10}>
          {tooltip}
          <TooltipArrow />
        </TooltipContent>
      </TooltipPrimitives.Portal>
    </TooltipPrimitives.Root>
  );
};
