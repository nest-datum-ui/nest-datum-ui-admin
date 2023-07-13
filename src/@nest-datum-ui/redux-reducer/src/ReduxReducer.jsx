import React from 'react';
import Entity from '@nest-datum-ui/entity';
import { ReduxReducerService } from './redux-reducer.service.js';
import { ReduxReducerController } from './redux-reducer.controller.js';
import { ReduxReducerEntity } from './redux-reducer.entity.jsx';

let ReduxReducer = ({ 
	children,
	...props 
}) => {
	return <Entity { ...props }>
		{children}
	</Entity>;
};

ReduxReducer = React.memo(ReduxReducer);
ReduxReducer.defaultProps = {
};
ReduxReducer.propTypes = {
};

export default ReduxReducerEntity.Renderer(() => new ReduxReducerController(new ReduxReducerService(new ReduxReducerEntity(ReduxReducer))));
