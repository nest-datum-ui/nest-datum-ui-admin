import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let View = (props) => {
	return <StyledWrapper { ...props } />
};

View = React.memo(View);
View.defaultProps = {
	lebel: 'Select email view file',
	systemId: 'files-system-email-views',
	allowSelectSystem: false,
};
View.propTypes = {
};

export default View;
