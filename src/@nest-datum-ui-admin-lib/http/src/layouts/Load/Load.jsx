import React from 'react';
import { Outlet } from 'react-router-dom';
import ContextWrapper from './Context/Wrapper.js';

let Load = ({ children }) => {
	return <ContextWrapper.Provider value={{}}>
		{children || <Outlet />}
	</ContextWrapper.Provider>;
};

Load = React.memo(Load);
Load.defaultProps = {
};
Load.propTypes = {
};

export default Load;