import React from 'react';
import { 
	ThemeProvider,
	createTheme, 
} from '@mui/material/styles';

const theme = createTheme({
	palette: {
		success: {
			main: '#388e3c',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	components: {
		MuiButton: {
			styleOverrides: {
			},
		},
	},
});

let Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>
		{children}
	</ThemeProvider>;
};

Theme = React.memo(Theme);
Theme.defaultProps = {
};

export default Theme;
