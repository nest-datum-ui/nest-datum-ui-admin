import React from 'react';
import TableCategory from '../../Table/Category';
import StyledWrapper from './Styled/Wrapper.jsx';

let Category = (props) => {
	return <StyledWrapper>
		<TableCategory />
	</StyledWrapper>;
};

Category = React.memo(Category);
Category.defaultProps = {
};
Category.propCategorys = {
};

export default Category;
