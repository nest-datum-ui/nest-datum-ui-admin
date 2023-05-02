import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import {
	selectorMainExtract,
	actionApiListProp,
	actionUrlFilter,
	actionUrlFilterClear,
	actionApiListMerge,
	hookUrlFilterItem,
} from '@nest-datum-ui/Store';
import Field from '@nest-datum-ui/Field';
import Select from 'components/Select';

let SystemId = ({ querySource }) => {
	const { 
		files: { 
			filesManagerList: {
				storeName: listStoreName,
			},
			filesSystemList: { 
				storeName, 
				apiFullUrl: apiUrl, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const valueStore = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'systemId' ]));
	const valueUrl = String(hookUrlFilterItem('systemId', search) ?? '');
	const value = (querySource === 'url')
		? valueUrl
		: valueStore;
	const onChange = React.useCallback((e) => {
		const systemId = e.target.value;

		actionApiListProp(listStoreName, 'loader', true)(() => {
			if (querySource === 'url') {
				actionUrlFilterClear('parentId');
				actionUrlFilter('systemId', systemId);
			}
			else {
				actionApiListMerge(storeName, {
					parentId: '',
					systemId,
				})();
			}
		});
	}, [
		storeName,
		listStoreName,
		querySource,
	]);

	return <Field
		Component={React.memo((props) => <Select 
			{ ...props }
			storeName={storeName}
			apiUrl={apiUrl} />)}
		form={storeName}
		onChange={onChange}
		itemKey="name"
		name="systemId"
		label="System"
		value={value} />;
};

SystemId = React.memo(SystemId);
SystemId.defaultProps = {
};
SystemId.propTypes = {
};

export default SystemId;
