import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        "normal-button" : "20",
        "floating-button": "30",
        "navigation": "40",
        "loader" : "50",
      },

      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite",
      },
    },
  },

  plugins: [
    plugin(function ({ addComponents }: any) {
      addComponents({
        ".inner-content": {
          margin: "0 auto",
          maxWidth: "1280px",
        },
      });
    }),
  ],
};
export default config;
