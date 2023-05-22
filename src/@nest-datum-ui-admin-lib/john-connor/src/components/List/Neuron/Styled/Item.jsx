import styled from 'styled-components';
import Box from '@mui/material/Box';

const Item = styled(Box)`
	position: absolute;
	width: 8px;
	height: 8px;
	border: 2px solid black;
	border-radius: 50%;
	background-color: red;
`;

export default Item;