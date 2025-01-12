/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'], // TailwindCSS가 적용될 파일 경로
  theme: {
    extend: {
      colors: {
        primary: '#6EA8FE',
        bordercolor: '#D9D9D9',
        text: '#262627'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'], // Pretendard 추가
      },
      fontWeight: {
        '500': '500',
      },
      fontSize: {
        '22px': '22px',
      },
      padding: {
        '25px': '25px',
        '50px': '50px',
        '10px': '10px',
      },
      height: {
        '45px': '45px',
        '50px': '50px',
        '164px':'164px'
      },
      borderWidth:{
        '0.5':'0.5px',
        '1': '1px',
      },
      spacing: {
        
      },
    },
  },
  plugins: [],
};