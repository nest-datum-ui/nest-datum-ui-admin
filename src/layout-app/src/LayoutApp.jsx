import React from 'react';
import { 
	Routes,
	Route,
	Outlet, 
} from 'react-router-dom';
import Entity from '@nest-datum-ui/entity';
import Grid from '@mui/material/Grid';
import RouteNotFound from 'route-not-found';
import MenuAside from 'menu-aside';
import StyledWrapper from './Styled/Wrapper.jsx';
import { LayoutAppService } from './layout-app.service.js';
import { LayoutAppController } from './layout-app.controller.js';
import { LayoutAppEntity } from './layout-app.entity.js';

let LayoutApp = ({
	children,
	...props 
}) => {
	return <Entity { ...props }>
		<Routes>
			<Route 
				path="/app/*"
				element={<StyledWrapper 
					container 
					spacing={3}>
					<Grid item>
						<MenuAside />
					</Grid>
					<Grid item>
						{children || <Outlet />}
					</Grid>
				</StyledWrapper>} />
			<Route
				path="*"
				element={<RouteNotFound />} />
		</Routes>
	</Entity>;
};

LayoutApp = React.memo(LayoutApp);
LayoutApp.defaultProps = {
};
LayoutApp.propTypes = {
};

export default LayoutAppEntity.Renderer(() => new LayoutAppController(new LayoutAppService(new LayoutAppEntity(LayoutApp))));

