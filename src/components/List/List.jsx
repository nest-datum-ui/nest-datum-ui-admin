import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiListPurge,
	actionApiListGet,
	hookUrlProperty, 
} from '@nest-datum-ui/Store';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import PaperFilter from 'components/Paper/Filter';
import StyledWrapper from './Styled/Wrapper.jsx';

let List = ({ 
	withFilter: propWithFilter,
	apiUrl: propsApiUrl,
	page, 
	limit, 
	query, 
	select, 
	filter, 
	initialFilter, 
	sort, 
	selectWrapper,
	filterWrapper,
	sortWrapper,
	ManageComponent,
	children, 
	querySource,
	...props 
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				apiFullUrl: contextApiUrl, 
				withFilter: contextWithFilter, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const apiUrl = propsApiUrl ?? contextApiUrl;
	const updatedIndex = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'updatedIndex' ])) || 0;
	const withFilter = propWithFilter ?? contextWithFilter;

	React.useEffect(() => {
		if (updatedIndex >= 0) {
			actionApiListGet(storeName, {
				apiUrl,
				page,
				limit,
				query,
				select: selectWrapper(utilsCheckFunc(select)
					? select()
					: select),
				filter: filterWrapper(utilsCheckFunc(initialFilter)
					? initialFilter()
					: utilsCheckFunc(filter)
						? filter()
						: (filter ?? initialFilter)),
				sort: sortWrapper(utilsCheckFunc(sort)
					? sort()
					: sort),
			})();
		}
	}, [
		storeName,
		apiUrl,
		page,
		limit,
		query,
		select,
		filter,
		initialFilter,
		sort,
		selectWrapper,
		filterWrapper,
		sortWrapper,
		updatedIndex,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper { ...props }>
		{withFilter && <PaperFilter 
			querySource={querySource} 
			ManageComponent={ManageComponent} />}
		{children}
	</StyledWrapper>;
};

List = React.memo(List);

let Url = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				initialPage, 
				initialLimit, 
				select: initialSelect,
				filter: initialFilter,
				sort: initialSort, 
			}, 
		},
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const queryUrl = hookUrlProperty('query', search);
	const selectUrl = hookUrlProperty('select', search) ?? initialSelect;
	const filterUrl = hookUrlProperty('filter', search) ?? initialFilter;
	const sortUrl = hookUrlProperty('sort', search) ?? initialSort;
	const pageUrl = Number(hookUrlProperty('page', search) || initialPage);
	const limitUrl = Number(hookUrlProperty('limit', search) || initialLimit);

	return <List
		query={queryUrl}
		select={selectUrl}
		filter={filterUrl}
		sort={sortUrl}
		page={pageUrl}
		limit={limitUrl}
		querySource="url"
		{ ...props } />;
};

Url = React.memo(Url);

let Store = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				storeName, 
				initialPage, 
				initialLimit, 
				select: initialSelect,
				filter: initialFilter,
				sort: initialSort, 
			}, 
		},
	} = React.useContext(ContextProps);
	const query = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'query' ]));
	const select = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'select' ])) ?? initialSelect;
	const filter = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'filter' ])) ?? initialFilter;
	const sort = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'sort' ])) ?? initialSort;
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) ?? initialPage;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) ?? initialLimit;
	const filterMemo = React.useCallback(() => filter, [
		filter,
	]);
	const selectMemo = React.useCallback(() => select, [
		select,
	]);
	const sortMemo = React.useCallback(() => sort, [
		sort,
	]);

	return <List
		query={query}
		select={selectMemo}
		filter={filterMemo}
		sort={sortMemo}
		page={page}
		limit={limit}
		querySource="store"
		{ ...props } />;
};

Store = React.memo(Store);

let StoreUrl = ({ querySource, ...props }) => {
	return (querySource === 'url')
		? <Url { ...props } />
		: ((querySource === 'store')
			? <Store { ...props } />
			: <List { ...props } />);
};

StoreUrl = React.memo(StoreUrl);
StoreUrl.defaultProps = {
	querySource: 'url',
	selectWrapper: (data) => data,
	filterWrapper: (data) => data,
	sortWrapper: (data) => data,
};
StoreUrl.propTypes = {
	querySource: PropTypes.string,
	selectWrapper: PropTypes.func,
	filterWrapper: PropTypes.func,
	sortWrapper: PropTypes.func,
};

export default StoreUrl;
