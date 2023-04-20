import React from 'react';
import Typography from '@mui/material/Typography';

let Label = ({
	children,
	...props
}) => {
	return <Typography
		component="div"
		variant="h6"
		{ ...props }>
		{children}
	</Typography>;
};

Label = React.memo(Label);
Label.defaultProps = {
};
Label.propTypes = {
};

export default Label;