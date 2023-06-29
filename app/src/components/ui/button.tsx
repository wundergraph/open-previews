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
    transition: "all 0.2s ease",
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
        _hover: { backgroundColor: "gray.300" },
      },
      default: {
        backgroundColor: "gray.200",
        _hover: { backgroundColor: "gray.300" },
      },
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
});

export const Button = styled("button", {
  base: {
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "fg.default",
    cursor: "pointer",
    transition: "all 0.2s ease",
    _focus: { boxShadow: "none" },
  },
  variants: {
    variant: {
      ghost: {
        backgroundColor: "transparent",
        _hover: { backgroundColor: "gray.300" },
      },
      default: {
        backgroundColor: "gray.200",
        _hover: { backgroundColor: "gray.300" },
      },
    },
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
    variant: "default",
    size: "md",
  },
});
