import React from 'react';
import Entity from '@nest-datum-ui/entity';
import { Provider as ProviderRedux } from 'react-redux';
import { ReduxService } from './redux.service.js';
import { ReduxController } from './redux.controller.js';
import { ReduxEntity } from './redux.entity.js';

let Redux = ({ 
	entityInstance,
	children, 
	...props
}) => {
	const instance = entityInstance();

	return <Entity { ...props } entityInstance={entityInstance}>
		{instance.store
			&& <ProviderRedux store={instance.store}>
				{children}
			</ProviderRedux>}
	</Entity>;
};

Redux = React.memo(Redux);
Redux.defaultProps = {
};
Redux.propTypes = {
};

export default ReduxEntity.Renderer(() => new ReduxController(new ReduxService(new ReduxEntity(Redux))));
