import { styled } from "@macaron-css/react";

export const Toolbar = styled("div", {
  base: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    display: "flex",
    zIndex: 1000,
  },
});
