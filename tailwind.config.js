/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nord0: "#2e3440",
        nord1: "#3b4252",
        nord2: "#434c5e",
        nord3: "#4c566a",
        nord4: "#d8dee9",
        nord6: "#eceff4",
      },
    },
  },
  plugins: [],
};
