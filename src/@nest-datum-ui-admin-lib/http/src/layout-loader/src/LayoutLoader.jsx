import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderController } from './layout-loader.controller.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

let LayoutLoader = ({ children }) => {
	return <StyledWrapper>
		{children}
	</StyledWrapper>;
};

LayoutLoader = React.memo(LayoutLoader);
LayoutLoader.defaultProps = {
};
LayoutLoader.propTypes = {
};

export default LayoutLoaderEntity.Renderer(() => new LayoutLoaderController(new LayoutLoaderService(new LayoutLoaderEntity(LayoutLoader))));

