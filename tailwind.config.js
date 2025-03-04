/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
    },
  },
  plugins: [],
  // Enable JIT mode
  future: {
    hoverOnlyWhenSupported: true,
  },
};
