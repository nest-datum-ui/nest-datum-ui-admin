import React from 'react';
import Entity from '@nest-datum-ui/entity';
import { ReduxReducerModelService } from './redux-reducer-model.service.js';
import { ReduxReducerModelController } from './redux-reducer-model.controller.js';
import { ReduxReducerModelEntity } from './redux-reducer-model.entity.jsx';

let ReduxReducerModel = ({ 
	children,
	...props 
}) => {
	return <Entity { ...props }>
		{children}
	</Entity>;
};

ReduxReducerModel = React.memo(ReduxReducerModel);
ReduxReducerModel.defaultProps = {
};
ReduxReducerModel.propTypes = {
};

export default ReduxReducerModelEntity.Renderer(() => new ReduxReducerModelController(new ReduxReducerModelService(new ReduxReducerModelEntity(ReduxReducerModel))));
