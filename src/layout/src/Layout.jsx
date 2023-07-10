import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
} from 'react-router-dom';
import ReduxModel from '@nest-datum-ui/redux-model';
import RouteHome from 'route-home';
import { LayoutService } from './layout.service.js';
import { LayoutController } from './layout.controller.js';
import { LayoutEntity } from './layout.entity.js';

let Layout = ({
	children,
	...props 
}) => {
	return <ReduxModel { ...props }>
		<BrowserRouter>
			<Routes>
				<Route
					path=""
					element={<RouteHome />} />
				<Route
					path="*"
					element={children || <Outlet />} />
			</Routes>
		</BrowserRouter>
	</ReduxModel>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default LayoutEntity.Renderer(() => new LayoutController(new LayoutService(new LayoutEntity(Layout))));
