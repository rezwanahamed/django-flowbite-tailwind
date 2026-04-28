/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.{html,js}",
    "./store/templates/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00D084",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
