import React from 'react';
import Grid from '@mui/material/Grid';
import ListNeuron from '../components/List/Neuron';
import ListInteract from '../components/List/Interact';

let Layout = ({ children }) => {
	const [ length, setLength ] = React.useState(() => 0);
	const onUpdate = React.useCallback((state) => setLength(state.length), [
		setLength,
	]);

	return <Grid 
		container
		sx={{
			height: 'calc(100% - 44px)',
			width: 'calc(100% + 24px)',
			marginLeft: '-24px',
			borderTop: '1px solid #e0e0e0',
		}}>
		<Grid
			item
			xs={true}
			sx={{
				height: '100%',
			}}>
			<ListNeuron length={length} />
		</Grid>
		<Grid
			item
			xs={2}
			sx={{
				height: '100%',
			}}>
			<ListInteract onUpdate={onUpdate} />
		</Grid>
	</Grid>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
