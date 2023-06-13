import { createTheme } from "@macaron-css/core";

import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  pink,
  pinkDark,
  grayDarkA,
  yellow,
  yellowDark,
} from "@radix-ui/colors";

export const [themeClass, theme] = createTheme({
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
    grayDarkA: {
      ...grayDarkA,
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
    pink: {
      ...pink,
    },
    pinkDark: {
      ...pinkDark,
    },
    yellow: {
      ...yellow,
    },
    yellowDark: {
      ...yellowDark,
    },
  },
  zIndex: {
    base: "20000",
  },
});

console.log("themeclass", themeClass);
