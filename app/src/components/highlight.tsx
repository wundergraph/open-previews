import { styled } from "@macaron-css/react";
import { theme } from "~/theme";

export const Highlight = styled("div", {
  base: {
    position: "fixed",
    backgroundColor: theme.color.pink.pink10,
    opacity: "0.5",
    pointerEvents: "none",
  },
});
