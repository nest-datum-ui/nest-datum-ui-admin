import React from 'react';
import Entity from '@nest-datum-ui/entity';
import { LayoutFetchService } from './layout-fetch.service.js';
import { LayoutFetchController } from './layout-fetch.controller.js';
import { LayoutFetchEntity } from './layout-fetch.entity.js';

let LayoutFetch = ({ 
	children,
	...props 
}) => {
	return <Entity { ...props }>
		{children}
	</Entity>;
};

LayoutFetch = React.memo(LayoutFetch);
LayoutFetch.defaultProps = {
};
LayoutFetch.propTypes = {
};

export default LayoutFetchEntity.Renderer(() => new LayoutFetchController(new LayoutFetchService(new LayoutFetchEntity(LayoutFetch))));

