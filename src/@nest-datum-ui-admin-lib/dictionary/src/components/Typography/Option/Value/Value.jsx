import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContextProps } from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Typography from '@mui/material/Typography';

let Value = ({ categoryOptionId, value }) => {
	const {
		forms: {
			formsFieldList: {
				apiFullUrl: apiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const fieldData = useSelector(selectorMainExtract([ 'api', 'list', `queue_${apiUrl}`, 'data' ])) ?? [];
	const fieldItem = fieldData.find((item) => item['id'] === categoryOptionId) || {};
	const dataTypeId = fieldItem['dataTypeId'];
	
	return (() => {
		switch (dataTypeId) {
			case 'happ-data-type-bool':
				return <Typography
					component="div"
					color="secondary">
					{String(Boolean(Number(value)))}
				</Typography>;
			case 'happ-data-type-int':
			case 'happ-data-type-float':
				return <Typography
					component="div"
					color="primary">
					{String(Number(value ?? 0))}
				</Typography>;
			default:
				return <Typography component="div">
					{String(value)}
				</Typography>;
		}
	})();
};

Value = React.memo(Value);
Value.defaultProps = {
};
Value.propTypes = {
	categoryOptionId: PropTypes.string.isRequired,
};

export default Value;
