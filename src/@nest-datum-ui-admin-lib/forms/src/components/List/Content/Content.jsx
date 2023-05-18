import React from 'react';
import TableContent from '../../Table/Content';
import StyledWrapper from './Styled/Wrapper.jsx';

let Content = (props) => {
	const sortWrapper = React.useCallback((value) => value ?? `{"createdAt":"DESC"}`, [
	]);

	return <StyledWrapper sortWrapper={sortWrapper}>
		<TableContent />
	</StyledWrapper>;
};

Content = React.memo(Content);
Content.defaultProps = {
};
Content.propContents = {
};

export default Content;
