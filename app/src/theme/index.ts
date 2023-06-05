// import { createTheme } from "@macaron-css/core";
import { createTheme } from "@vanilla-extract/css";

import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from "@radix-ui/colors";

export const [themeClass, vars] = createTheme({
  color: {
    gray: {
      ...gray,
    },
    blue: {
      ...blue,
    },
    red: {
      ...red,
    },
    green: {
      ...green,
    },
    grayDark: {
      ...grayDark,
    },
    blueDark: {
      ...blueDark,
    },
    redDark: {
      ...redDark,
    },
    greenDark: {
      ...greenDark,
    },
  },
});
