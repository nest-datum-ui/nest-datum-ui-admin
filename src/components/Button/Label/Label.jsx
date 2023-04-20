import React from 'react';
import Button from '@mui/material/Button'
import FileCopyIcon from '@mui/icons-material/FileCopy';

let Collapse = ({ children, ...props }) => {
	return <Button color="secondary" variant="contained" { ...props }>
		{children}
	</Button>;
};

Collapse = React.memo(Collapse);
Collapse.defaultProps = {
	children: 'Select file',
	startIcon: <FileCopyIcon />,
};
Collapse.propTypes = {
};

export default Collapse;
