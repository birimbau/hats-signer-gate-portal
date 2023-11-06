import { extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { text } from "stream/consumers";

const colors = {
	cyan: {
		100: "#C4F1F9",
		700: "#0987A0",
	},
	gray: {
		700: "#2D3748",
	},
	button: {
		disabled: "#B3B3B3",
		black: "#2D3748",
		gray: "#B3B3B3",
		white: "#FFFFFF",
	},
};

const globals = {
	"html,body": {
		padding: 0,
		margin: 0,
		fontFamily: "inter",
		// '-apple-system',
		// 'BlinkMacSystemFont',
		// 'Segoe UI',
		// 'Roboto',
		// 'Oxygen',
		// 'Ubuntu',
		// 'Cantarell',
		// 'Fira Sans',
		// 'Droid Sans',
		// 'Helvetica Neue',
		// 'sans-serif',
	},

	a: {
		color: "inherit",
		textDecoration: "none",
	},

	// * {
	// 	box-sizing: border-box;
	// }
};

const styles = {
	global: {
		body: {
			fontFamily: "inter",
			fontWeight: 500,
		},
	},
};

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

const fonts = {
	inter: inter.style.fontFamily,
};

export const theme = extendTheme({ colors, styles, fonts });
