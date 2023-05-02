import React from 'react';
import Typography from '@mui/material/Typography';

let Caption = ({
	children,
	...props
}) => {
	return <Typography
		component="div"
		variant="caption"
		color="textSecondary"
		{ ...props }>
		{children}
	</Typography>;
};

Caption = React.memo(Caption);
Caption.defaultProps = {
};
Caption.propTypes = {
};

export default Caption;