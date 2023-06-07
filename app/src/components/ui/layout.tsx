import { styled } from "@macaron-css/react";
import { vars } from "~/theme";

export const Flex = styled("div", { base: { display: "flex" } });

export const Text = styled("p", {
  base: {
    margin: 0,
    // color: mauve.mauve12,
    fontSize: 15,
    lineHeight: "19px",
    fontWeight: 500,
  },
});
