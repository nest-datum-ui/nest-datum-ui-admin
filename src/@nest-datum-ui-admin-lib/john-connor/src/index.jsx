import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';

let JohnConnor = () => {
	return <Routes>
		<Route
			path="john-connor"
			element={<Layout />} />
	</Routes>;
};

JohnConnor = React.memo(JohnConnor);
JohnConnor.defaultProps = {
};
JohnConnor.propTypes = {
};

export default JohnConnor;
