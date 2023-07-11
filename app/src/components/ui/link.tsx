import { styled } from "../../../styled-system/jsx";

export const Link = styled("a", {
    base: {
        fontFamily: "inherit",
        color: "fg.default",
        cursor: "pointer",
        transition: "all 0.2s ease",
        _focus: { outline: 'none', boxShadow: "none" },
        _focusVisible: {outline:'none', boxShadow: `0 0 0 2px black` },
    },
});