const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        gray: {
          50: "#B1ABCB",
          100: "#A59EC3",
          200: "#8E85B4",
          300: "#776CA4",
          400: "#63588F",
          500: "#514976",
          600: "#40395C",
          700: "#2E2A43",
          800: "#1D1A2A",
          900: "#050507",
          950: "#000000",
        },
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
      },
    },
  },
  plugins: [
    require("tailwindcss-fluid-type"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
