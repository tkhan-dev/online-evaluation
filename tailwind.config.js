/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'light-primary-color': 'var(--light-primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'light-shadow-color': 'var(--light-shadow-color)',
        'light-purple-color': 'var(--light-purple-color)',
        'primary-purple-color': 'var(--primary-purple-color)',
        'success-color': 'var(--success-color)',
        'gray-border-color': 'var(--gray-border-color)',
        'warning-color': 'var(--warning-color)',
        'info-color': 'var(--info-color)',
        'red-color': 'var(--red-color)',
        'black-color': 'var(--black-color)',
        'gray-color': 'var(--gray-color)',
        'light-gray-color': 'var(--light-gray-color)',
        'background-color': 'var(--background-color)',
        'backwhite-color': 'var(--backwhite-color)',
        'error-light-color': 'var(--error-light-color)',
        'info-light-color': 'var(--info-light-color)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
