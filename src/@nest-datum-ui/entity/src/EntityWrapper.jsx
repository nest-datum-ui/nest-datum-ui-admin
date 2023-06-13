import React from 'react';

let EntityWrapper = ({ 
	ContextCurrent,
	ContextParent,
	entityInstance,
	serviceInstance,
	controllerInstance,
	children,
}) => {
	const contextCurrent = React.useContext(ContextCurrent);
	const contextParent = React.useContext(ContextParent ?? {});

	return <ContextCurrent.Provider value={{}}>
		{children}
	</ContextCurrent.Provider>;
};

EntityWrapper = React.memo(EntityWrapper);
EntityWrapper.defaultProps = {
};
EntityWrapper.propTypes = {
};

export default EntityWrapper;
