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

import { textStyles } from "./src/theme/text-styles";

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
  include: ["./src/**/*.{ts,tsx}"],

  presets: ["@pandacss/dev/presets"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      semanticTokens: {
        colors: {
          fg: {
            default: { value: { base: "{colors.gray.900}", _dark: "white" } },
            emphasized: {
              value: { base: "{colors.gray.700}", _dark: "{colors.gray.200}" },
            },
            muted: {
              value: { base: "{colors.gray.500}", _dark: "{colors.gray.400}" },
            },
            subtle: {
              value: { base: "{colors.gray.400}", _dark: "{colors.gray.500}" },
            },
            placeholder: {
              value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
            },
            inverted: {
              default: { value: { base: "white", _dark: "{colors.black}" } },
            },
          },
          bg: {
            canvas: {
              value: { base: "{colors.gray.25}", _dark: "{colors.gray.900}" },
            },
            surface: {
              value: { base: "{colors.gray.50}", _dark: "{colors.gray.600}" },
            },
            muted: {
              value: { base: "{colors.gray.200}", _dark: "{colors.gray.400}" },
            },
            subtle: {
              value: { base: "{colors.gray.100}", _dark: "{colors.gray.500}" },
            },
          },
          accent: {
            default: {
              value: {
                base: "{colors.pink.400}",
                _dark: "{colors.pink.400}",
              },
            },
            emphasized: {
              value: {
                base: "{colors.pink.500}",
                _dark: "{colors.pink.500}",
              },
            },
            muted: {
              value: {
                base: "{colors.pink.400}",
                _dark: "{colors.pink.300}",
              },
            },
            subtle: {
              value: {
                base: "{colors.pink.50}",
                _dark: "{colors.pink.900}",
              },
            },
          },
          border: {
            default: {
              value: { base: "{colors.gray.200}", _dark: "{colors.gray.400}" },
            },
            emphasized: {
              value: { base: "{colors.gray.300}", _dark: "{colors.gray.300}" },
            },
          },
        },
        shadows: {
          xs: {
            value: {
              base: "0px 0px 1px rgba(48, 49, 51, 0.05), 0px 1px 2px rgba(48, 49, 51, 0.1)",
              _dark: "0px 0px 1px #0D0D0D, 0px 1px 2px rgba(13, 13, 13, 0.9)",
            },
          },
          sm: {
            value: {
              base: "0px 0px 1px rgba(48, 49, 51, 0.05), 0px 2px 4px rgba(48, 49, 51, 0.1)",
              _dark: "0px 0px 1px #0D0D0D, 0px 2px 4px rgba(13, 13, 13, 0.9)",
            },
          },
          md: {
            value: {
              base: "0px 0px 1px rgba(48, 49, 51, 0.05), 0px 4px 8px rgba(48, 49, 51, 0.1)",
              _dark: "0px 0px 1px #0D0D0D, 0px 4px 8px rgba(13, 13, 13, 0.9)",
            },
          },
          lg: {
            value: {
              base: "0px 0px 1px rgba(48, 49, 51, 0.05), 0px 8px 16px rgba(48, 49, 51, 0.1)",
              _dark: "0px 0px 1px #0D0D0D, 0px 8px 16px rgba(13, 13, 13, 0.9)",
            },
          },
          xl: {
            value: {
              base: "0px 0px 1px rgba(48, 49, 51, 0.05), 0px 16px 24px rgba(48, 49, 51, 0.1)",
              _dark: "0px 0px 1px #0D0D0D, 0px 16px 24px rgba(13, 13, 13, 0.9)",
            },
          },
        },
        zIndex: {
          base: { value: 20000 },
          popover: { value: 20001 },
        },
      },

      keyframes: {
        slideUpAndFade: {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        slideRightAndFade: {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },

        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        slideLeftAndFade: {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});

// tokens: {
//   // colors: {
//   //   gray: mapColor(gray),
//   //   blue: mapColor(blue),
//   //   red: mapColor(red),
//   //   green: mapColor(green),
//   //   grayDark: mapColor(grayDark),
//   //   blueDark: mapColor(blueDark),
//   //   redDark: mapColor(redDark),
//   //   greenDark: mapColor(greenDark),
//   //   pink: mapColor(pink),
//   //   pinkDark: mapColor(pinkDark),
//   //   grayDarkA: mapColor(grayDarkA),
//   //   yellow: mapColor(yellow),
//   //   yellowDark: mapColor(yellowDark),
//   // },

//   zIndex: {
//     base: { value: 20000 },
//   },
// },
