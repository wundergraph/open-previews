import { defineConfig } from "@pandacss/dev";

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

const mapColor = (shades) => {
  return Object.entries(shades).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: { value },
    };
  }, {});
};

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  prefix: "op",

  hash: false, // hash in production

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        // colors: {
        //   gray: mapColor(gray),
        //   blue: mapColor(blue),
        //   red: mapColor(red),
        //   green: mapColor(green),
        //   grayDark: mapColor(grayDark),
        //   blueDark: mapColor(blueDark),
        //   redDark: mapColor(redDark),
        //   greenDark: mapColor(greenDark),
        //   pink: mapColor(pink),
        //   pinkDark: mapColor(pinkDark),
        //   grayDarkA: mapColor(grayDarkA),
        //   yellow: mapColor(yellow),
        //   yellowDark: mapColor(yellowDark),
        // },
        zIndex: {
          base: { value: 20000 },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
