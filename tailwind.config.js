/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(black)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        screen: "100% 200vh",
      },
      animation: {
        objectPosition: "bgposition 15s ease-in-out infinite alternate",
        slowlyRotate: "spin 45s linear infinite",
      },
      keyframes: {
        bgposition: {
          "0%": { objectPosition: "0% 0%" },
          "100%": { objectPosition: "0% 100%" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)", scale: "200%" },
          "100%": { transform: "rotate(360deg)", scale: "200%" },
        },
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/line-clamp"),
  ],
};
