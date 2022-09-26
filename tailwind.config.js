module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#ffe81f",
        black: "#28282B",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
