import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { ContextOptions } from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiListGet,
	actionApiListPurge,
} from '@nest-datum-ui/Store';
import { arrFilled as utilsCheckArrFilled } from '@nest-datum-utils/check';
import Select from '@nest-datum-ui/Select';

let Enum = (props) => {
	const [ id ] = React.useState(() => uuidv4());
	const { dataTypeId } = React.useContext(ContextOptions);
	const storeName = `dataType${dataTypeId}_${id}`;
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 0, 'typeTypeTypeOptions' ]));

	React.useEffect(() => {
		if (dataTypeId) {
			actionApiListGet(storeName, {
				apiUrl: `${process.env.URL_API_DATA_TYPE}/type/option`,
				page: 1,
				limit: 9999,
				filter: {
					typeId: dataTypeId,
					typeTypeTypeOptions: {
						typeId: dataTypeId,
					},
				},
			})();
		}
	}, [
		dataTypeId,
		storeName,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return utilsCheckArrFilled(data)
		&& <Select { ...props }>
			{data.map((item) => ({ id: item.id, title: item.content }))}
		</Select>;
};

Enum = React.memo(Enum);
Enum.defaultProps = {
	name: 'enum',
	label: 'Enum',
	placeholder: 'Enum value',
};
Enum.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};

export default Enum;
