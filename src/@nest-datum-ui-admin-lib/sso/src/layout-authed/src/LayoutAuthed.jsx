import React from 'react';
import Entity from '@nest-datum-ui/entity';
import RouteSignIn from '../../route-sign-in';
import {
	Routes,
	Route,
} from 'react-router-dom';
import { LayoutAuthedService } from './layout-authed.service.js';
import { LayoutAuthedController } from './layout-authed.controller.js';
import { LayoutAuthedEntity } from './layout-authed.entity.js';

let LayoutAuthed = ({ 
	children,
	...props 
}) => {
	return <Entity { ...props }>
		<Routes>
			<Route
				path="sign-in"
				element={<RouteSignIn />} />
			<Route
				path="*"
				element={children} />
		</Routes>
	</Entity>;
};

LayoutAuthed = React.memo(LayoutAuthed);
LayoutAuthed.defaultProps = {
};
LayoutAuthed.propTypes = {
};

export default LayoutAuthedEntity.Renderer(() => new LayoutAuthedController(new LayoutAuthedService(new LayoutAuthedEntity(LayoutAuthed))));

