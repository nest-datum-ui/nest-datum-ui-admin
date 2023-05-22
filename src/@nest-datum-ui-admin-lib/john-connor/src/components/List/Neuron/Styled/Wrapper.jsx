import styled from 'styled-components';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)`
	position: relative;
	height: 100%;
	width: 100%;
	overflow: scroll;

	& > .area-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		& > .area {
			position: relative;
			width: 12px;
			height: 12px;
		}
	}
`;

export default Wrapper;