import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyan": "#30BCED",
        "jet": "#303036",
        "ghost-white": "#FFFAFF",
        "tomato": "#FC5130",
        "dark-gray": "#050401"
      }
    },
  },
  plugins: [],
};
export default config;
