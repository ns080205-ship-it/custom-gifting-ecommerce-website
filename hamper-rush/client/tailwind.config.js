/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f5',
          100: '#ffe4e4',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#f06b6b',
          600: '#e03131',
        },
        rose: {
          blush: '#f4d0d0',
          light: '#fde8e8',
          soft: '#fbdada',
          deep: '#e8a0a0',
        },
        gold: {
          light: '#f5e6c8',
          DEFAULT: '#d4a853',
          dark: '#b8892e',
          pale: '#faf0dc',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf5ec',
          200: '#f5ead8',
          300: '#eddcc0',
        },
        champagne: '#f7e7ce',
        pearl: '#f8f4f0',
        mink: '#b5a09a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'gradient-blush': 'linear-gradient(135deg, #fde8e8 0%, #faf5ec 50%, #fde8e8 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f5e6c8 0%, #d4a853 100%)',
        'gradient-hero': 'linear-gradient(160deg, #fdf0f0 0%, #faf5ec 40%, #fde8e8 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'luxury': '0 4px 30px rgba(212, 168, 83, 0.15)',
        'card': '0 2px 20px rgba(181, 160, 154, 0.12)',
        'card-hover': '0 8px 40px rgba(181, 160, 154, 0.25)',
        'btn': '0 4px 15px rgba(212, 168, 83, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
