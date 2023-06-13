import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';
import ContextWrapper from './Context/Wrapper.js';

let Menu = ({ 
	children, 
	...props 
}) => {
	return <ContextWrapper.Provider value={{}}>
		<StyledWrapper { ...props }>
			{children}
		</StyledWrapper>
	</ContextWrapper.Provider>;
};

Menu = React.memo(Menu);
Menu.defaultProps = {
};
Menu.propTypes = {
};

export default Menu;
