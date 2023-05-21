import React from 'react';
import Grid from '@mui/material/Grid';
import ListNeuron from '../components/List/Neuron';
import ListInteract from '../components/List/Interact';

let Layout = ({ children }) => {
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
			<ListNeuron />
		</Grid>
		<Grid
			item
			xs={2}
			sx={{
				height: '100%',
			}}>
			<ListInteract />
		</Grid>
	</Grid>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
