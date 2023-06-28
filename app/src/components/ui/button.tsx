import { styled } from "../../../styled-system/jsx";

export const IconButton = styled("button", {
  base: {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: 35,
    width: 35,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray.500",
    backgroundColor: "white",
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.12)`,
    _hover: { backgroundColor: "gray.200" },
    _focus: { boxShadow: `0 0 0 2px black` },
  },
});

export const Button = styled("button", {
  base: {
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    bg: "gray.400",
    boxShadow: "sm",
    _hover: { backgroundColor: "gray.500" },
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
