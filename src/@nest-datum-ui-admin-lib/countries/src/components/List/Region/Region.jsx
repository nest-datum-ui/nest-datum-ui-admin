import React from 'react';
import TableRegion from '../../Table/Region';
import StyledWrapper from './Styled/Wrapper.jsx';

let Region = (props) => {
	return <StyledWrapper>
		<TableRegion />
	</StyledWrapper>;
};

Region = React.memo(Region);
Region.defaultProps = {
};
Region.propRegions = {
};

export default Region;
