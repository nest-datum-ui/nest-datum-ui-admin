import React from 'react';
import { ReduxModelService } from './redux-model.service.js';
import { ReduxModelController } from './redux-model.controller.js';
import { ReduxModelEntity } from './redux-model.entity.jsx';

export const Context = React.createContext();

let ReduxModel = ({
	ContextCurrent,
	entityInstance,
	controllerInstance,
	columnsInstance,
	children,
	...props 
}) => {
	const parent = React.useContext(ContextCurrent);
	const entity = React.useMemo(() => entityInstance(), [
		entityInstance,
	]);
	const parentControllerInstance = React.useMemo(() => parent.controllerInstance(), [
		parent,
	]);
	const parentEntityInstance = React.useMemo(() => parent.entityInstance(), [
		parent,
	]);
	const parentEntityInstanceReducers = React.useMemo(() => parentEntityInstance.reducers, [
		parentEntityInstance,
	]);
	const controllerUpdate = React.useCallback((...properties) => (parentControllerInstance.update.bind(parentControllerInstance))(...properties), [
		parentControllerInstance,
	]);
	const setReducer = React.useCallback(() => (parentEntityInstance && parentEntityInstance.store)
		&& controllerUpdate({
			...parentEntityInstanceReducers,
			[entity.id]: parentEntityInstanceReducers[parentEntityInstance.id],
			id: entity.id,
		}), [
		entity,
		parentEntityInstance,
		parentEntityInstanceReducers,
		controllerUpdate,
	]);

	React.useMemo(() => {
		setReducer();
	}, [
		setReducer,
	]);

	return <Context.Provider value={{ entityInstance, controllerInstance, columnsInstance }}>
		{children}
	</Context.Provider>;
};

ReduxModel = React.memo(ReduxModel);
ReduxModel.defaultProps = {
};
ReduxModel.propTypes = {
};

export default ReduxModelEntity.Renderer(() => new ReduxModelController(new ReduxModelService(new ReduxModelEntity(ReduxModel))));
