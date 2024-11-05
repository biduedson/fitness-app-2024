import type { Config } from "tailwindcss";
import { DEFAULT_CIPHERS } from "tls";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '15px'
  	},
  	screens: {
  		xsm: '480px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1400px',
  		Xxl: '1536px'
  	},
  	fontFamily: {
  		oswald: 'var(--font-oswald)',
  		roboto: 'var(--font-roboto)'
  	},
	
  	backgroundImage: {
  		hero: 'url(/assets/img/hero/bg.png)',
  		membership: 'url(/assets/img/membership/bg.jpg)',
  		login: 'url(/assets/img/muscle.png)',
  		black_texture: 'url(/assets/img/black_texture.jpg)',
		'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
  	},
  	textShadow: {
  		'outline-red': '2px 2px 0 #d4000d, -2px -2px 0 #d4000d, 2px -2px 0 #d4000d, -2px 2px 0 #d4000d',
  		'outline-white': '1px 1px 0 #d4000d, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
  	},
  	extend: {
		fontSize: {
        'clamp-lg': 'clamp(1.5rem, 3vw, 2rem)',
        'clamp-md': 'clamp(1rem, 2vw, 1.2rem)',
      },
  		colors: {
  			primary: {
  				100:'#484848',
          200:'#151515',
          300:'#111',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent:'#d4000d',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		clipPath: {
  			'custom-bottom': 'ellipse(90% 100% at 50% 0%)'
  		},
  		keyframes: {
  			slideDownAndFadeOut: {
  				'0%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				},
  				'70%': {
  					transform: 'translateY(50%)',
  					opacity: '0.5'
  				},
  				'100%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			slideDownAndFadeOut: 'slideDownAndFadeOut 2.5s ease-in-out forwards'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: any) => void }) {
      const newUtilities = {
        '.clip-custom-bottom': {
          'clip-path': 'ellipse(90% 100% at 50% 0%)',
        },
      };
      addUtilities(newUtilities);
    },
    require('tailwindcss-textshadow'),
      require("tailwindcss-animate")
] ,
};
export default config;
