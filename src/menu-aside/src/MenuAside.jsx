import React from 'react';
import ButtonDashboard from 'button-dashboard';
import StyledWrapper from './Styled/Wrapper.jsx';
import { MenuAsideService } from './menu-aside.service.js';
import { MenuAsideController } from './menu-aside.controller.js';
import { MenuAsideEntity } from './menu-aside.entity.js';

let MenuAside = ({
	children,
	...props 
}) => {
	return <StyledWrapper disablePadding>
		<ButtonDashboard />
	</StyledWrapper>;
};

MenuAside = React.memo(MenuAside);
MenuAside.defaultProps = {
};
MenuAside.propTypes = {
};

export default MenuAsideEntity.Renderer(() => new MenuAsideController(new MenuAsideService(new MenuAsideEntity(MenuAside))));

