import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Store, { 
	selectorMainExtract,
	actionUrlSort,
	actionUrlUpdate,
	actionUrlFilterClear,
	actionApiListProp,
	actionApiListMerge,
} from '@nest-datum-ui/Store';
import TablePagination from '@nest-datum-ui/Table/Pagination';

let Table = ({ children, querySource, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				rowColumns, 
				bulkDeletion, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ])) ?? 0;
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 'length' ]));
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ]));
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ]));
	const onChangePage = React.useCallback((e, newPage) => actionApiListProp(storeName, 'loader', true)(() => (newPage !== page)
		&& (querySource === 'url')
			? actionUrlUpdate('page', newPage)
			: actionApiListProp(storeName, 'page', newPage)()), [
		storeName,
		page,
		querySource,
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)(async () => {
			if (querySource === 'url') {
				await actionUrlFilterClear('page');
				await actionUrlUpdate('limit', e.target.value);
			}
			else {
				actionApiListMerge(storeName, {
					page: 1,
					limit: e.target.value,
				})();
			}
		});
	}, [
		storeName,
		querySource,
	]);
	const onSort = React.useCallback((key) => (value) => actionApiListProp(storeName, 'loader', true)(() => (querySource === 'url')
		? actionUrlSort(key, value)
		: actionApiListProp(storeName, 'sort', {
			...(Store()
				.getState()
				.api
				.list[storeName] || {})
				.sort || {},
			[key]: value,
		})()), [
		storeName,
		querySource,
	]);

	return <TablePagination
		loader={loader || unmount === true}
		total={total}
		page={page}
		limit={limit}
		length={dataLength}
		onChange={onChangePage}
		onLimit={onLimit}
		bulkDeletion={bulkDeletion}
		headRowCells={rowColumns.map((item) => ({ ...item, onSort: onSort(item.id) }))}
		{ ...props }>
		{children}
	</TablePagination>;
};

Table = React.memo(Table);
Table.defaultProps = {
	withChangeLimit: true,
	querySource: 'url',
};
Table.propTypes = {
	storeName: PropTypes.string, 
	apiUrl: PropTypes.string, 
	initialPage: PropTypes.number, 
	initialLimit: PropTypes.number, 
	rowColumns: PropTypes.array,
	withChangeLimit: PropTypes.bool,
	querySource: PropTypes.string,
};

export default Table;
