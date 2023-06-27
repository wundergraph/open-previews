import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { styled } from "../../../styled-system/jsx";

export const Toolbar = styled(ToolbarPrimitive.Root, {
  base: {
    display: "flex",
    padding: "8px",
    minWidth: "max-content",
    borderRadius: "25px",
    bg: "bg.surface",
    border: "1px solid",
    borderColor: "border.default",
    backgroundBlendMode: "color-burn",
    backdropBlur: "base",
  },
});

const itemStyles = {
  flex: "0 0 auto",
  color: "muted",
  backgroundColor: "transparent",
  border: 0,
  height: "32px",
  minWidth: "32px",
  padding: "0 4px",
  borderRadius: "25px",
  display: "inline-flex",
  fontSize: "14px",
  lineHeight: "1",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export const ToolbarToggleItem = styled(ToolbarPrimitive.ToggleItem, {
  base: {
    ...itemStyles,
    position: "relative",
    _hover: {
      backgroundColor: "bg.muted",
    },
    _focusVisible: {
      boxShadow: "0 0 0 2px token(colors.pink.500)",
    },
    '&[data-state="on"]': {
      backgroundColor: "bg.muted",
    },
  },
});

export const ToolbarSeparator = styled(ToolbarPrimitive.Separator, {
  base: {
    width: "1px",
    backgroundColor: "border.default",
    margin: "0 8px",
  },
});

export const ToolbarLink = styled(ToolbarPrimitive.Link, {
  base: {
    ...itemStyles,
    backgroundColor: "transparent",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    _hover: { backgroundColor: "bg.muted" },
    _focusVisible: {
      position: "relative",
      boxShadow: "0 0 0 2px token(colors.pink.500)",
    },
  },
});

export const ToolbarButton = styled(ToolbarPrimitive.Button, {
  base: {
    ...itemStyles,
    _hover: {
      backgroundColor: "bg.muted",
    },
    _focusVisible: {
      position: "relative",
      boxShadow: "0 0 0 2px token(colors.pink.500)",
    },
  },
});

export const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup;