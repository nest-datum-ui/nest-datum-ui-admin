import React from 'react';
import TableTag from '../../Table/Tag';
import StyledWrapper from './Styled/Wrapper.jsx';

let Tag = (props) => {
	return <StyledWrapper>
		<TableTag />
	</StyledWrapper>;
};

Tag = React.memo(Tag);
Tag.defaultProps = {
};
Tag.propTags = {
};

export default Tag;
