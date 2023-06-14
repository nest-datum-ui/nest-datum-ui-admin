import React from 'react';

let EntityWrapper = ({ 
	ContextCurrent,
	ContextParent,
	entityInstance,
	serviceInstance,
	controllerInstance,
	children,
}) => {
	const contextParent = React.useContext(ContextParent ?? ContextCurrent);
	const contextParentProcessed = contextParent ?? { entityInstance, serviceInstance, controllerInstance };

	return <ContextCurrent.Provider value={contextParentProcessed}>
		{children}
	</ContextCurrent.Provider>;
};

EntityWrapper = React.memo(EntityWrapper);
EntityWrapper.defaultProps = {
};
EntityWrapper.propTypes = {
};

export default EntityWrapper;
