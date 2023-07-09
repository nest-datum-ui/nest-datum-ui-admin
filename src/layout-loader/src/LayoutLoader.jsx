import React from 'react';
import { Outlet } from 'react-router-dom';
import StyledWrapper from './Styled/Wrapper.jsx';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderController } from './layout-loader.controller.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

let LayoutLoader = ({
	children,
	...props 
}) => {
	return <StyledWrapper>
		{children || <Outlet />}
	</StyledWrapper>;
};

LayoutLoader = React.memo(LayoutLoader);
LayoutLoader.defaultProps = {
};
LayoutLoader.propTypes = {
};

export default LayoutLoaderEntity.Renderer(() => new LayoutLoaderController(new LayoutLoaderService(new LayoutLoaderEntity(LayoutLoader))));

