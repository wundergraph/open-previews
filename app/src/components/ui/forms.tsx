import { styled } from "../../../styled-system/jsx";

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
    fontSize: "sm",
    width: "75px",
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
    borderRadius: "4px",
    padding: "0 10px",
    fontSize: "sm",
    lineHeight: 1,
    boxShadow: `sm`,
    height: "25px",
    _focus: { boxShadow: `0 0 0 2px token(colors.pink.500)` },
  },
});

export const Textarea = styled("textarea", {
  base: {
    border: 0,
    background: "transparent",
    outline: 0,
    color: "inherit",
    width: "100%",
    fontFamily: "inherit",
    minHeight: "60px",
    padding: "8px 12px",
  },
});
