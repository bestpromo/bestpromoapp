/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#282C2E",
        primary: "#FE6030",
        secondary: "#FD9471",
        darklight: "#A7AFB5"
      },
      fontFamily: {
        thin: ["Sora_100Thin", "sans-serif"],
        extralight: ["Sora_200ExtraLight", "sans-serif"],
        light: ["Sora_300Light", "sans-serif"],
        regular: ["Sora_400Regular", "sans-serif"],
        medium: ["Sora_500Medium", "sans-serif"],
        semibold: ["Sora_600SemiBold", "sans-serif"],
        bold: ["Sora_700Bold", "sans-serif"],
        extrabold: ["Sora_800ExtraBold", "sans-serif"],
        sans: ["Sora_400Regular", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};