import React from 'react';
import TableCompany from '../../Table/Company';
import StyledWrapper from './Styled/Wrapper.jsx';

let Company = (props) => {
	return <StyledWrapper>
		<TableCompany />
	</StyledWrapper>;
};

Company = React.memo(Company);
Company.defaultProps = {
};
Company.propTypes = {
};

export default Company;
