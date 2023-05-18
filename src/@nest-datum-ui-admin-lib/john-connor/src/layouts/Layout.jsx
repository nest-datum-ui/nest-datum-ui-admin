import React from 'react';
import Grid from '@mui/material/Grid';
import ListNeuron from '../components/List/Neuron';
import ListInteract from '../components/List/Interact';

let Layout = ({ children }) => {
	return <Grid container>
		<Grid
			item
			xs={true}>
			<ListNeuron />
		</Grid>
		<Grid
			item
			xs={2}>
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
