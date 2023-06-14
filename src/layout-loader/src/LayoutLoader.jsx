import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ReduxModel from '@nest-datum-ui/redux-model';
import StyledWrapper from './Styled/Wrapper.jsx';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderController } from './layout-loader.controller.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

let LayoutLoader = ({
	entityInstance,
	children,
	...props
}) => {
	console.log('entityInstance222', props);

	return <ReduxModel>
		<StyledWrapper 
			container 
			spacing={3}>
			<Grid item>
				111
			</Grid>
			<Grid item>
				{children || <Outlet />}
			</Grid>
		</StyledWrapper>
	</ReduxModel>;
};

LayoutLoader = new LayoutLoaderController(new LayoutLoaderService(new LayoutLoaderEntity(React.memo(LayoutLoader))));
LayoutLoader.defaultProps = {
};
LayoutLoader.propTypes = {
};

export default LayoutLoader;
