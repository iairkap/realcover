/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */ const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui()],
  theme: {},
};
