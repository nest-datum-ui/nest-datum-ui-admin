import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';
import ContextWrapper from './Context/Wrapper.js';

let Header = ({ 
	children, 
	...props 
}) => {
	return <ContextWrapper.Provider value={{}}>
		<StyledWrapper { ...props }>
			{children}
		</StyledWrapper>
	</ContextWrapper.Provider>;
};

Header = React.memo(Header);
Header.defaultProps = {
};
Header.propTypes = {
};

export default Header;
