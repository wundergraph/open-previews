import { styled } from "@macaron-css/react";
import { theme } from "~/theme";

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
    color: theme.color.green.green11,
    backgroundColor: "white",
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.12)`,
    ":hover": { backgroundColor: theme.color.green.green3 },
    ":focus": { boxShadow: `0 0 0 2px black` },
  },
});

export const Button = styled("button", {
  base: {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "4px",
    height: 26,
    paddingLeft: 4,
    paddingRight: 4,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    backgroundColor: "white",
    fontSize: "14px",
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.12)`,
    ":hover": { backgroundColor: theme.color.green.green3 },
    ":focus": { boxShadow: `0 0 0 2px black` },
  },
});
