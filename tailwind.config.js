module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#ffe81f",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
