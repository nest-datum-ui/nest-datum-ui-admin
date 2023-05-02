import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Manager = (props) => {
	return <StyledWrapper { ...props } />
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	lebel: 'Select avatar',
	systemId: 'files-system-avatars',
	allowSelectSystem: false,
};
Manager.propTypes = {
};

export default Manager;
