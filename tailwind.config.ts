import type { Config } from "tailwindcss";
import { DEFAULT_CIPHERS } from "tls";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container:{
      center: true,
      padding:'15px'
    },
    screens:{
      xsm:'480px',
      sm:'640px',
      md:'768px',
      lg:'1024px',
      xl:'1400px',
      Xxl:'1536px'
    },
    fontFamily:{
       oswald:'var(--font-oswald)',
       roboto:'var(--font-roboto)',
    },
    backgroundImage:{
       hero:'url(/assets/img/hero/bg.png)',
       membership:'url(/assets/img/membership/bg.jpg)',
       login:'url(/assets/img/muscle.png)',
       black_texture:'url(/assets/img/black_texture.jpg)',
    },
    extend: {
      colors: {
        primary:{
          DEFAULT:'#333',
          100:'#484848',
          200:'#151515',
          300:'#111',
        },
        accent:'#d4000d',
    },
    keyframes: {
        slideDownAndFadeOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(50%)', opacity: '0.5' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        slideDownAndFadeOut: 'slideDownAndFadeOut 2.5s ease-in-out forwards',
      },
  },
  },
  plugins: [],
};
export default config;
