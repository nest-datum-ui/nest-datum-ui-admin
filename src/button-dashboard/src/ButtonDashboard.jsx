import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ButtonDashboardService } from './button-dashboard.service.js';
import { ButtonDashboardController } from './button-dashboard.controller.js';
import { ButtonDashboardEntity } from './button-dashboard.entity.js';

let ButtonDashboard = ({
	children,
	...props 
}) => {
	return <ListItem 
		disablePadding>
		<ListItemButton>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText>
				<Typography color="initial">
					{children || 'Dashboard'}
				</Typography>
			</ListItemText>
		</ListItemButton>
	</ListItem>;
};

ButtonDashboard = React.memo(ButtonDashboard);
ButtonDashboard.defaultProps = {
};
ButtonDashboard.propTypes = {
};

export default ButtonDashboardEntity.Renderer(() => new ButtonDashboardController(new ButtonDashboardService(new ButtonDashboardEntity(ButtonDashboard))));

