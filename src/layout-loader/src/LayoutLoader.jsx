import React from 'react';
import Entity from '@nest-datum-ui/entity';
import { Outlet } from 'react-router-dom';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderController } from './layout-loader.controller.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

let LayoutLoader = ({
	children,
	...props 
}) => {
	return <Entity { ...props }>
		{children || <Outlet />}
	</Entity>;
};

LayoutLoader = React.memo(LayoutLoader);
LayoutLoader.defaultProps = {
};
LayoutLoader.propTypes = {
};

export default LayoutLoaderEntity.Renderer(() => new LayoutLoaderController(new LayoutLoaderService(new LayoutLoaderEntity(LayoutLoader))));

