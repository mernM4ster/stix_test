/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
		screens: {
			'xxxs': '320px',
			'xxs': '390px',
			'xs': '475px',
		}
	},
	plugins: [],
}