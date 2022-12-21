// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zinc: {
          900: "#202225",
          800: "#292b2f",
          700: "#2f3136",
          600: "#36393f",
          500: "#40444b",
        },
        indigo: {
          600: "#5865f2",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        },
        ".scrollbar-default::-webkit-scrollbar": {
          width: "14px",
        },
        ".scrollbar-default::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 14px 14px rgba(0, 0, 0, 0.25)",
          border: "solid 3px transparent",
          borderRadius: "8px",
        },
        ".scrollbar-default::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 14px 14px rgba(0, 0, 0, 0.4)",
          border: "solid 3px transparent",
          borderRadius: "8px",
        },
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "8px",
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 8px 8px rgba(0, 0, 0, 0.25)",
          border: "solid 3px transparent",
          borderRadius: "8px",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 8px 8px rgba(0, 0, 0, 0.4)",
          border: "solid 3px transparent",
          borderRadius: "8px",
        },
      });
    }),
  ],
};
