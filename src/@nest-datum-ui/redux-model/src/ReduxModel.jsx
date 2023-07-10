import React from 'react';
import Entity from '@nest-datum-ui/entity';
import { ReduxModelService } from './redux-model.service.js';
import { ReduxModelController } from './redux-model.controller.js';
import { ReduxModelEntity } from './redux-model.entity.jsx';

let ReduxModel = ({ 
	children,
	...props 
}) => {
	return <Entity { ...props }>
		{children}
	</Entity>;
};

ReduxModel = React.memo(ReduxModel);
ReduxModel.defaultProps = {
};
ReduxModel.propTypes = {
};

export default ReduxModelEntity.Renderer(() => new ReduxModelController(new ReduxModelService(new ReduxModelEntity(ReduxModel))));
