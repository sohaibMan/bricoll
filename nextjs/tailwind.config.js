/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Plus Jakarta Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: "#73bb44",
        second: "#4C4444",
        gray: "#838383",
        newColor: "#E3EAF6",
        primary_2: "#18181B"
      }
    },
  },
  plugins: [],
}

