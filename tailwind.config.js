/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'white-md': '2px 2px 5px rgba(255, 255, 255, 0.75)',
        'white-xl': '4px 4px 8px rgba(255, 255, 255, 0.75)',
      }
    },
  },
  plugins: [],
}