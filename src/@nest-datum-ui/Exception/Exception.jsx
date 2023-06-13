import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';
import ContextWrapper from './Context/Wrapper.js';

let Exception = ({ 
	children, 
	...props 
}) => {
	return <ContextWrapper.Provider value={{}}>
		<StyledWrapper { ...props }>
			{children}
		</StyledWrapper>
	</ContextWrapper.Provider>;
};

Exception = React.memo(Exception);
Exception.defaultProps = {
};
Exception.propTypes = {
};

export default Exception;
