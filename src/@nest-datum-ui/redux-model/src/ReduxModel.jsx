import React from 'react';
import { ReduxModelService } from './redux-model.service.js';
import { ReduxModelController } from './redux-model.controller.js';
import { ReduxModelEntity } from './redux-model.entity.js';

let ReduxModel = ({
	children,
	...props 
}) => {
	return <React.Fragment>
		{children}
	</React.Fragment>;
};

ReduxModel = new ReduxModelController(new ReduxModelService(new ReduxModelEntity(React.memo(ReduxModel))));
ReduxModel.defaultProps = {
};
ReduxModel.propTypes = {
};

export default ReduxModel;
