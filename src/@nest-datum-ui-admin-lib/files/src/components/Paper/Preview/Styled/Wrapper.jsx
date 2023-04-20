import styled from 'styled-components';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)`
	width: max-content;
	height: max-content;
	width: 54px;
	height: 54px;
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;

	${({ isimage, url }) => (isimage === 1 && url)
		? `
			background-image: url(${url});
			width: 200px;
			height: 140px;
		`
		: ''}
`;

export default Wrapper;