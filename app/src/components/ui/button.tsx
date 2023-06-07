import { styled } from "@macaron-css/react";
import { vars } from "~/theme";

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
    color: vars.color.green.green11,
    backgroundColor: "white",
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.12)`,
    ":hover": { backgroundColor: vars.color.green.green3 },
    ":focus": { boxShadow: `0 0 0 2px black` },
  },
});

export const Button = styled("button", {
  base: {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: 35,
    paddingLeft: 2,
    paddingRight: 2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: vars.color.green.green11,
    backgroundColor: "white",
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.12)`,
    ":hover": { backgroundColor: vars.color.green.green3 },
    ":focus": { boxShadow: `0 0 0 2px black` },
  },
});
