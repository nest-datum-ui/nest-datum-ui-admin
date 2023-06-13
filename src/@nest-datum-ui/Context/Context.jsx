import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from './context.service.jsx';

let ContextProvider = ({ 
	children, 
	properties,
	Service, 
	Component,
	ContextCurrent,
	ContextParent,
}) => {
	const [ componentId ] = React.useState(() => uuidv4());
	const [ instance, setInstance ] = React.useState(() => {});
	const contextParent = React.useContext(ContextParent);
	const additionalProperties = React.useState(() => ({}));
	const setAdditionalProperties = additionalProperties[1];
	const mergeParentProps = React.useCallback((callback = (properties) => (properties ?? {})) => {
		setAdditionalProperties((currentAdditionalProperties) => callback(currentAdditionalProperties));
	}, [
		setAdditionalProperties,
	]);
	const ContextParentProcessed = React.useMemo(() => ContextParent || ContextCurrent, [
		ContextParent,
		ContextCurrent,
	]);
	
	React.useEffect(() => {
		(async () => {
			let additionalProperties = {},
				instance;

			setAdditionalProperties((currentAdditionalProperties) => (additionalProperties = currentAdditionalProperties));
			additionalProperties = { 
				...await properties(), 
				...additionalProperties, 
			};

			instance = (Service)
				? await new Service(additionalProperties)
				: (contextParent)
					&& await (async () => {
						const reduxEntityModelService = contextParent.children[Object
							.keys(contextParent.children)
							.find((key) => contextParent
								.children[key]
								.reducerName === 'ReduxEntityModelService')];

						return await reduxEntityModelService.create(additionalProperties);
					})();

			if (instance) {
				setInstance(instance);
				setTimeout(() => setAdditionalProperties(additionalProperties), 0);
			}
		})();
	}, [
		Service,
		properties,
		contextParent,
		setInstance,
		setAdditionalProperties,
	]);

	(instance || {})['componentId'] = componentId;
	(instance || {})['mergeParentProps'] = mergeParentProps;
	(instance || {})['ContextParent'] = ContextParentProcessed;

	return instance
		&& <ContextParentProcessed.Provider value={instance}>
			<Component 
				instance={instance} 
				componentId={componentId}
				ContextParent={ContextParentProcessed}>
				{children}
			</Component>
		</ContextParentProcessed.Provider>;
};

ContextProvider = React.memo(ContextProvider);
ContextProvider.defaultProps = {
	properties: async () => ({}),
	ContextParent: Context,
};
ContextProvider.propTypes = {
	properties: PropTypes.func,
};

export default ContextProvider;

