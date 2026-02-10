/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#000000",

        accent: {
          yellow: "#FFE066", // comic highlight
          mint: "#C7EDE6",   // calm, Notion-like
        },
      },
      boxShadow: {
        comic: "6px 6px 0px #000",
        comicSm: "4px 4px 0px #000",
      },
      borderWidth: {
        comic: "3px",
      },
      fontFamily: {
        comic: ["'Comic Neue'", "cursive"],
        ui: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
