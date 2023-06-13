import React from 'react';
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

	return instance.store
		&& <ProviderRedux store={instance.store}>
			{children}
		</ProviderRedux>;
};

Redux = new ReduxController(new ReduxService(new ReduxEntity(React.memo(Redux))));
Redux.defaultProps = {
};
Redux.propTypes = {
};

export default Redux;
