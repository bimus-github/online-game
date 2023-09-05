const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "600px" },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      ...colors,
      bg: colors.amber[200],
      "bg-l": colors.amber[100],
      "bg-d": colors.amber[300],
      "bg-btn": colors.sky[400],
      "bg-btn-l": colors.sky[300],
      "bg-btn-d": colors.sky[500],
    },
  },
  plugins: [],
};
