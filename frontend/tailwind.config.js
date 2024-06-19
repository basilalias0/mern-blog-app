/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    extend: {
      colors: {
        "collection-1-accent": "var(--collection-1-accent)",
        "collection-1-dark": "var(--collection-1-dark)",
        "collection-1-light-bg": "var(--collection-1-light-bg)",
        "collection-1-light-grey-border": "var(--collection-1-light-grey-border)",
        "collection-1-light-text": "var(--collection-1-light-text)",
        "collection-1-white": "var(--collection-1-white)",
      },
    },
  },
  plugins: [],
};
