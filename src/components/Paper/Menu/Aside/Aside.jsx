import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';
import ContextWrapper from './Context/Wrapper.js';

let Aside = ({ 
	children, 
	...props 
}) => {
	return <ContextWrapper.Provider value={{}}>
		<StyledWrapper { ...props }>
			{children}
		</StyledWrapper>
	</ContextWrapper.Provider>;
};

Aside = React.memo(Aside);
Aside.defaultProps = {
};
Aside.propTypes = {
};

export default Aside;
