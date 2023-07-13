import React from 'react';
import LayoutFetch from '../../layout-fetch';
import { LayoutFetchInitService } from './layout-fetch-init.service.js';
import { LayoutFetchInitController } from './layout-fetch-init.controller.js';
import { LayoutFetchInitEntity } from './layout-fetch-init.entity.js';

let LayoutFetchInit = ({ 
	children,
	controllerInstance,
	entityInstance,
	...props 
}) => {
	const [ mounted, setMounted ] = React.useState(() => false);

	React.useEffect(() => {
		setMounted(true);
	}, [
		setMounted,
	]);

	React.useEffect(() => {
		if (mounted) {
			controllerInstance().many(entityInstance().columnsInstance());
		}
	}, [
		mounted,
		controllerInstance,
		entityInstance,
	]);

	return <LayoutFetch 
		{ ...props } 
		controllerInstance={controllerInstance} 
		entityInstance={entityInstance}>
		{children}
	</LayoutFetch>;
};

LayoutFetchInit = React.memo(LayoutFetchInit);
LayoutFetchInit.defaultProps = {
};
LayoutFetchInit.propTypes = {
};

export default LayoutFetchInitEntity.Renderer(() => new LayoutFetchInitController(new LayoutFetchInitService(new LayoutFetchInitEntity(LayoutFetchInit))));

