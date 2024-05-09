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
        "tomato": "#FC5130",
        "jet": "#303036",
        "ghost-white": "#faf5fa",
        "dark-ghost-white": "#eae6ea",
        "dark-gray": "#050401",
        "dark-cyan": "#2697be",
        "dark-tomato": "#bd3d24",
      }
    },
  },
  plugins: [],
};
export default config;
