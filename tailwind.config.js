/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131417",
        secondary: "#1e1f26",
        primaryText: "#868ca0",
        textColor: "#555",
      },
    },
  },
  plugins: [],
};
