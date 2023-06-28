import { styled } from "../../../styled-system/jsx";

export const IconButton = styled("button", {
  base: {
    fontFamily: "inherit",
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "fg.default",
    cursor: "pointer",
    _focus: { boxShadow: `0 0 0 2px black` },
  },
  variants: {
    size: {
      sm: {
        borderRadius: "24px",
        height: "24px",
        width: "24px",
        fontSize: "13px",
      },
      md: {
        borderRadius: "32px",
        height: "32px",
        width: "32px",
        fontSize: "14px",
      },
    },
    variant: {
      ghost: {
        backgroundColor: "transparent",
        _hover: { backgroundColor: "gray.200" },
      },
      default: {
        _hover: { backgroundColor: "gray.200" },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const Button = styled("button", {
  base: {
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    bg: "gray.300",
    boxShadow: "sm",
    cursor: "pointer",
    _hover: { backgroundColor: "gray.400" },
    _focus: { boxShadow: "none" },
  },
  variants: {
    size: {
      sm: {
        borderRadius: "4px",
        height: "24px",
        paddingLeft: "4px",
        paddingRight: "4px",
        fontSize: "13px",
      },
      md: {
        borderRadius: "5px",
        height: "32px",
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "14px",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
