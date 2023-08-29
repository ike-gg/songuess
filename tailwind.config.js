/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        1500: "1500ms",
        1000: "1000ms",
        750: "750ms",
        100: "100ms",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(black)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gridX: "linear-gradient(to right, black 1px, transparent 1px),",
      },
      animation: {
        objectPosition: "bgposition 15s ease-in-out infinite alternate",
        slowlyRotate: "spinBackground 90s linear infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        spin: "spin 2s linear infinite",
        pulsePing: "pulsePing 2s ease-out infinite",
      },
      backgroundSize: {
        button: "100% 150%",
      },
      colors: {
        spotify: {
          50: "#f0fdf4",
          100: "#dbfde6",
          200: "#baf8cf",
          300: "#84f1aa",
          400: "#48e07d",
          500: "#1db954",
          600: "#14a547",
          700: "#13823b",
          800: "#156633",
          900: "#13542c",
          950: "#042f15",
        },
        apple: {
          50: "#fff1f2",
          100: "#ffe0e1",
          200: "#ffc6c8",
          300: "#ff9ea2",
          400: "#ff676d",
          500: "#fc3c44",
          600: "#ea1821",
          700: "#c51018",
          800: "#a31117",
          900: "#86161b",
          950: "#490609",
        },
      },
      boxShadow: {
        "3xl": "inset 0 10px 20px -10px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        pulsePing: {
          "0%": { scale: "100%", opacity: 0.7 },
          "75%": { scale: "350%", opacity: 0 },
          "100%": { opacity: 0 },
        },
        bgposition: {
          "0%": { objectPosition: "0% 0%" },
          "100%": { objectPosition: "0% 100%" },
        },
        spin: {
          "0%": { rotate: "0deg" },
          "100%": { rotate: "360deg" },
        },
        spinBackground: {
          "0%": { rotate: "0deg", scale: "200%" },
          "100%": { rotate: "360deg", scale: "200%" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("tailwindcss-animate"),
  ],
};
