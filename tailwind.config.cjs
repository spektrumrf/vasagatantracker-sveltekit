/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				cupcake: {
					...require('daisyui/src/theming/themes')['[cupcake]'],
					primary: '#ef9fbc',
					secondary: '#65c3c8'
				}
			}
		]
	}
};
