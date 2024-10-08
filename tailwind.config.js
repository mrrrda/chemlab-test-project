/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',
        'primary-dark': '#13588F',
        secondary: '#F1F1F1',
        error: '#FF4646',
        neutral: {
          900: '#121212',
        },
      },
      fontSize: {
        sm: ['0.75rem, 0.85rem'],
        base: ['1rem', '1.2rem'],
        xl: ['1.25rem', '1.5rem'],
        '2xl': ['1.5rem', '1.8rem'],
        '3xl': ['2rem', '2.4rem'],
        '4xl': ['2.5rem', '3rem'],
        '5xl': ['3rem', '3.6rem'],
      },
      fontFamily: {
        'fira-sans': ['Fira Sans', 'system-ui', 'sans-serif'],
      },
      padding: {
        13: '3.25rem',
        26: '6.25rem',
        42: '10.25rem',
      },
      margin: {
        50: '12.5rem',
      },
      gap: {
        13: '3.25rem',
        18: '4.5rem',
        30: '7.5rem',
        50: '12.5rem',
      },
      width: {
        98: '25rem',
        100: '30rem',
        104: '32.5rem',
      },
      minWidth: {
        104: '32.5rem',
      },
      height: {
        15: '3.625rem',
        18: '4.5rem',
        70: '17.5rem',
        84: '22rem',
        100: '30rem',
        104: '32.5rem',
      },
      flexGrow: {
        2: '2',
      },
      screens: {
        xs: '390px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
