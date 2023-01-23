/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        192: "48rem",
      },
      height: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
    },
  },
  plugins: [],
};
