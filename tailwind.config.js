module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-background":
          "linear-gradient(to bottom, rgba(45, 50, 130, .5), rgba(2, 14, 52, .1)), linear-gradient(to bottom, rgba(22, 32, 54, 0), #121c29fa), url('/img/castle-header-background.webp')",
      },
      fontFamily: {
        sans: [
          "Outfit",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        base: ["1rem", { lineHeight: "1.5rem" }],

        // Body text
        "body-xs": ["0.75rem", { lineHeight: "1.5rem" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5rem" }],

        // Titles
        xs: ["1rem", { lineHeight: "1rem" }],
        sm: ["1.5rem", { lineHeight: "2rem" }],
        md: ["2rem", { lineHeight: "1.25rem" }],
        "2md": ["3rem", { lineHeight: "1.75rem" }],
        "lg": ["3.5rem", { lineHeight: "3.7rem" }],
        xl: ["4rem", { lineHeight: "4.3rem" }],
        "2xl": ["7.5rem", { lineHeight: "7rem" }],
      },
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      primary: {
        25: "#F5F8FF",
        50: "#EEF4FF",
        100: "#E0EAFF",
        200: "#C7D7FE",
        300: "#A4BCFD",
        400: "#8098F9",
        500: "#6172F3",
        600: "#444CE7",
        700: "#3538CD",
        800: "#2D31A6",
        900: "#2D3282",
        950: "#020E34",
      },
      gray: {
        25: "#FCFCFD",
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#344054",
        800: "#1D2939",
        900: "#101828",
      },
      error: {
        light: "#FECDCA",
        dark: "#F97066",
      },
      warning: {
        light: "#FEF0C7",
        medium: "#FDB022",
        dark: "#B55108",
      },
      success: {
        light: "#D1FADF",
        dark: "#12B76A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
