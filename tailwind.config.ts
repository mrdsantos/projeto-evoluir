import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ['Barriecito', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
    daisyui
  ],
  daisyui: {
    themes: ["halloween"],
    // darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    logs: true,
    themeRoot: ":root",
  },
};

export default config;
