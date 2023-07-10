import React from 'react';

let EntityWrapper = ({ 
	children,
	entityInstance,
	controllerInstance,
	...props
}) => {
	React.useEffect(() => {
		controllerInstance().mount(entityInstance().columnsInstance());
	}, [
		controllerInstance,
		entityInstance,
	]);

	return children;
};

EntityWrapper = React.memo(EntityWrapper);
EntityWrapper.defaultProps = {
};
EntityWrapper.propTypes = {
};

export default EntityWrapper;
