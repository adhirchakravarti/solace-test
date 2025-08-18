import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-light": "linear-gradient(to bottom, #ffffff, #b3cac2)",
        "gradient-dark": "linear-gradient(to bottom, #040a08, #1d4339)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
