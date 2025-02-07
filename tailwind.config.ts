import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    typography,
    daisyui
  ],
  daisyui: {
    themes: ["emerald", "dim"],
    darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    logs: true,
    themeRoot: ":root",
  },
};

export default config;
