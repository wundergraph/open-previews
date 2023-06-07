import { styled } from "@macaron-css/react";

export const Fieldset = styled("fieldset", {
  base: {
    all: "unset",
    display: "flex",
    gap: 20,
    alignItems: "center",
  },
});

export const Label = styled("label", {
  base: {
    fontSize: 13,
    // color: violet.violet11,
    width: 75,
  },
});

export const Input = styled("input", {
  base: {
    all: "unset",
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1",
    borderRadius: 4,
    padding: "0 10px",
    fontSize: 13,
    lineHeight: 1,
    // color: violet.violet11,
    // boxShadow: `0 0 0 1px ${violet.violet7}`,
    height: 25,

    // '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
  },
});
