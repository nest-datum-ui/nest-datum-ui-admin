import React from 'react';
import { Outlet } from 'react-router-dom';
import ContextWrapper from './Context/Wrapper.js';

let Authed = ({ children }) => {
	return <ContextWrapper.Provider value={{}}>
		{children || <Outlet />}
	</ContextWrapper.Provider>;
};

Authed = React.memo(Authed);
Authed.defaultProps = {
};
Authed.propTypes = {
};

export default Authed;