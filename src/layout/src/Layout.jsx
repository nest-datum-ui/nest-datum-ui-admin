import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { LayoutService } from './layout.service.js';
import { LayoutController } from './layout.controller.js';
import { LayoutEntity } from './layout.entity.js';
import RouteHome from 'Route/Home';
import RouteSystemNotFound from 'Route/System/NotFound';

let Layout = ({
	children,
	...props 
}) => {
	console.log('entityInstance111', props);

	return <BrowserRouter>
		<Routes>
			<Route
				path=""
				element={<RouteHome />} />
			<Route
				path={`/app`}
				element={children} />
			<Route
				path="*"
				element={<RouteSystemNotFound />} />
		</Routes>
	</BrowserRouter>;
};

Layout = new LayoutController(new LayoutService(new LayoutEntity(React.memo(Layout))));
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
