import React from 'react';
import RouteSignIn from '../../route-sign-in';
import {
	Routes,
	Route,
} from 'react-router-dom';
import { LayoutAuthedService } from './layout-authed.service.js';
import { LayoutAuthedController } from './layout-authed.controller.js';
import { LayoutAuthedEntity } from './layout-authed.entity.js';

let LayoutAuthed = ({ children }) => {
	return <React.Fragment>
		<Routes>
			<Route
				path="sign-in"
				element={<RouteSignIn />} />
			<Route
				path="*"
				element={children} />
		</Routes>
	</React.Fragment>;
};

LayoutAuthed = React.memo(LayoutAuthed);
LayoutAuthed.defaultProps = {
};
LayoutAuthed.propTypes = {
};

export default LayoutAuthedEntity.Renderer(() => new LayoutAuthedController(new LayoutAuthedService(new LayoutAuthedEntity(LayoutAuthed))));

