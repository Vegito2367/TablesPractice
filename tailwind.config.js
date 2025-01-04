/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
			animation: {
				fade: 'fadeIn 1s ease-in-out',
        flyIn: "flyIn .7s ease-in-out",
			},


			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
        flyIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
			},
		},
  },
  plugins: [],
}