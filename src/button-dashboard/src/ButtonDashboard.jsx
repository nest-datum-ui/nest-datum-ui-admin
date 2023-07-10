import React from 'react';
import { ButtonDashboardService } from './button-dashboard.service.js';
import { ButtonDashboardController } from './button-dashboard.controller.js';
import { ButtonDashboardEntity } from './button-dashboard.entity.js';

let ButtonDashboard = ({
	children,
	...props 
}) => {
	return <React.Fragment>
		Dashboard
	</React.Fragment>;
};

ButtonDashboard = React.memo(ButtonDashboard);
ButtonDashboard.defaultProps = {
};
ButtonDashboard.propTypes = {
};

export default ButtonDashboardEntity.Renderer(() => new ButtonDashboardController(new ButtonDashboardService(new ButtonDashboardEntity(ButtonDashboard))));

