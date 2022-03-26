const colors = require("tailwindcss/colors");
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/**/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
	],
	theme: {
		extend: {},
		colors: {
			"yellow-dk": "#96872E",
			"yellow-lt": "#bfae44",
			"green-military-lt": "#4C5844",
			"green-military-dk": "#3E4637",
			...colors,
		},
	},
	plugins: [],
};
