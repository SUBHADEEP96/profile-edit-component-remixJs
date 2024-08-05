import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        btfont: "0.625rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
