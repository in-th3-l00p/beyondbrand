/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "red": "#FC5959",
        "grey": "#262626",
        "light": "#EEEEEF"
      }
    },
  },
  plugins: [],
}

