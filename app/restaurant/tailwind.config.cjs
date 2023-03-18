const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// fonts
			fontFamily: {
				sans: ['IBM Plex Sans Thai', 'sans-serif'],
				serif: ['Sarabun', 'IBM Plex Sans Thai', 'serif'],
				display: ['Gimmick', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace']
			}
		}
	},
	daisyui: {
		themes: [
			{
				botranpa: {
					primary: '#84cc16',
					secondary: '#D926AA',
					accent: '#661AE6',
					neutral: '#191D24',
					'base-100': '#161616',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272'
				}
			}
		]
	},

	plugins: [typography, daisyui]
};

module.exports = config;
