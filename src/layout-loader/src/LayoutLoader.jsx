import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import StyledWrapper from './Styled/Wrapper.jsx';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderController } from './layout-loader.controller.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

let LayoutLoader = ({
	entityInstance,
	children,
}) => {
	return <StyledWrapper 
		container 
		spacing={3}>
		<Grid item>
			111
		</Grid>
		<Grid item>
			{children || <Outlet />}
		</Grid>
	</StyledWrapper>;
};

LayoutLoader = new LayoutLoaderController(new LayoutLoaderService(new LayoutLoaderEntity(React.memo(LayoutLoader))));
LayoutLoader.defaultProps = {
};
LayoutLoader.propTypes = {
};

export default LayoutLoader;
