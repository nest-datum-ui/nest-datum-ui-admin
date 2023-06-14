import React from 'react';
import { ReduxModelService } from './redux-model.service.js';
import { ReduxModelController } from './redux-model.controller.js';
import { ReduxModelEntity } from './redux-model.entity.jsx';

export const Context = React.createContext();

let ReduxModel = ({
	entityInstance,
	controllerInstance,
	columnsInstance,
	children,
	...props 
}) => {
	const entity = React.useMemo(() => entityInstance(), [
		entityInstance,
	]);
	const controller = React.useMemo(() => controllerInstance(), [
		controllerInstance,
	]);
	const setReducer = React.useCallback(() => (entity && entity.store)
		&& controller.update({
			...entity.reducers,
			[entity.id]: entity.reducers.default,
			id: entity.id,
		}), [
		entity,
		controller,
	]);

	React.useMemo(() => {
		setReducer();
	}, [
		setReducer,
	]);

	React.useMemo(() => {
		if (entity && entity.store) {
			setTimeout(() => {
				console.log('entity.store.getState()', entity.store.getState());
			}, 10000);
		}
	}, [
		entity,
	]);

	return <Context.Provider value={{}}>
		{children}
	</Context.Provider>;
};

ReduxModel = new ReduxModelController(new ReduxModelService(new ReduxModelEntity(React.memo(ReduxModel))));
ReduxModel.defaultProps = {
};
ReduxModel.propTypes = {
};

export default ReduxModel;
