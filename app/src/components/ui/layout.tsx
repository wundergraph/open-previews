import { styled } from "../../../styled-system/jsx";

export const Text = styled("p", {
  base: {
    margin: 0,
    fontSize: "sm",
    lineHeight: "19px",
    fontWeight: 500,
  },
});

export const Link = styled("a", {
  base: {
    color: "pink.500",
    fontSize: "sm",
    textDecoration: "none",
    _hover: {
      textDecoration: "underline",
    },
  },
});
