/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF7E9',
        cherry: { DEFAULT: '#A51F2B', deep: '#7E1520' },
        cocoa: '#382521',
        blush: '#EBCBC2',
        gold: '#E9C978',
      },
      fontFamily: {
        display: ['"Bowlby One SC"', 'Impact', 'sans-serif'],
        sans: ['"DM Sans Variable"', '"DM Sans"', 'system-ui', 'sans-serif'],
        label: ['"Barlow Condensed"', '"DM Sans Variable"', 'sans-serif'],
      },
      maxWidth: { shell: '1360px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        spin360: { to: { transform: 'rotate(360deg)' } },
        wobble: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        rise: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        spin360: 'spin360 28s linear infinite',
        wobble: 'wobble 5s ease-in-out infinite',
        rise: 'rise .6s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}
