import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e6ebff",
          200: "#c4ceff",
          300: "#94a5ff",
          400: "#5f73ff",
          500: "#3a4dff",
          600: "#2330d6",
          700: "#1c27a8",
          800: "#181f82",
          900: "#141a66"
        }
      }
    }
  },
  plugins: []
};

export default config;
