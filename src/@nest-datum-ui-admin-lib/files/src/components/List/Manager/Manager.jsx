import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import ReduxStore, { 
	selectorMainExtract,
	actionApiListGet,
	actionApiListProp,
	actionApiListPurge,
	actionApiListMerge,
	actionApiFormPurge,
	actionApiFormProp,
	actionBreadcrumbsSet,
	actionUrlFilter,
	hookUrlFilterItem, 
	hookUrlNavigate,
} from '@nest-datum-ui/Store';
import { objFilled as utilsCheckObjFilled } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuBreadcrumbs from '@nest-datum-ui/Menu/Breadcrumbs';
import PaperManager from '../../Paper/Manager';
import TableManager from '../../Table/Manager';
import FormSystemId from '../../Form/SystemId';
import StyledWrapper from './Styled/Wrapper.jsx';

let Manager = ({
	systemInitialFilter,
	systemId,
	parentId,
	allowSelectSystem,
	querySource,
	withContextMenu,
	bulkDeletion,
	onCheck,
	onFolder,
	onFile,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				apiFullUrl: apiUrl, 
				storeName,
				folders: {
					apiFullUrl: foldersApiUrl,
				},
			}, 
			filesSystemList: {
				storeName: filesSystemListStoreName,
			},
		}, 
	} = React.useContext(ContextProps);
	const onBreadcrumbs = React.useCallback((e, { key, index }) => {
		if (querySource === 'url') {
			actionUrlFilter('parentId', key);
		}
		else {
			actionApiListProp(filesSystemListStoreName, 'parentId', key)(() => {
				const currentFilter = (ReduxStore()
					.getState()
					.api
					.list[storeName] || {})
					.filter || {};

				actionApiListProp(storeName, 'filter', { ...currentFilter, parentId: key })();
			});
		}
	}, [
		storeName,
		filesSystemListStoreName,
		querySource,
	]);

	React.useEffect(() => {
		if (systemId) {
			actionApiListGet(`${storeName}_parentFolder`, { 
				apiUrl: foldersApiUrl, 
				limit: 1, 
				filter: {
					parentId: '',
					systemId,
				},
			})(async ({ data = [] }) => {
				const parentId = (querySource === 'url')
					? hookUrlFilterItem('parentId')
					: (ReduxStore()
						.getState()
						.api
						.list[filesSystemListStoreName] || {})
						.parentId;

				if (parentId) {
					const core = data[0];

					actionApiListGet(`${storeName}_parentFolder`, { 
						apiUrl: foldersApiUrl, 
						limit: 1, 
						filter: {
							id: parentId,
							systemId,
						},
					})(async ({ data = [] }) => {
						if (data.length > 0) {
							const dataSplit = data[0]['path'].replace(core['path'], '').split('/');

							if (dataSplit.length > 1) {
								const last = data[0];
								let i = 0,
									paths = [];

								while (i < dataSplit.length - 1) {
									paths.push(paths.length === 0
										? `${core['path']}/${dataSplit[i]}`.replace(new RegExp('//', 'g'), '/')
										: `${dataSplit[dataSplit.length - 1]}/${dataSplit[i]}`.replace(new RegExp('//', 'g'), '/'));
									i++;
								}
								actionApiListGet(`${storeName}_parentFolder`, { 
									apiUrl: foldersApiUrl, 
									limit: 1, 
									filter: {
										systemId,
										path: [ '$In', ...paths ],
									},
								})(async ({ data = [] }) => {
									await actionApiFormProp(storeName, 'systemId', systemId)();
									await actionApiFormProp(storeName, 'parentId', parentId)();
									await actionBreadcrumbsSet(storeName, [{ 
										key: core['id'], 
										text: '...', 
									}, 
									...paths.map((path) => {
										const item = data.find((item) => item['path'] === path);

										return {
											key: item['id'], 
											text: item['name'], 
										};
									}), {
										key: parentId, 
										text: last['name'], 
									}])();
								});
							}
							else {
								await actionApiFormProp(storeName, 'systemId', systemId)();
								await actionApiFormProp(storeName, 'parentId', parentId)();
								await actionBreadcrumbsSet(storeName, [{ 
									key: core['id'], 
									text: '...', 
								}, {
									key: parentId, 
									text: data[0]['name'], 
								}])();
							}
						}
					});
				}
				else {
					await actionApiFormProp(storeName, 'systemId', systemId)();
					await actionApiFormProp(storeName, 'parentId', data[0]['id'])();
					await actionBreadcrumbsSet(storeName, [{ key: data[0]['id'], text: '...' }])();

					if (querySource === 'url') {
						hookUrlNavigate(`${window.location.pathname}?filter={"systemId":"${systemId}","parentId":"${data[0]['id']}"}`);
					}
					else {
						actionApiListMerge(filesSystemListStoreName, {
							parentId: data[0]['id'],
							systemId,
						})();
					}
				}
			});
		}
	}, [
		systemId,
		foldersApiUrl,
		storeName,
		filesSystemListStoreName,
		querySource,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(storeName)();
		actionApiListPurge(storeName)();
		actionApiFormPurge(filesSystemListStoreName)();
		actionApiListPurge(filesSystemListStoreName)();
		actionApiFormPurge(`${storeName}_query`)();
		actionApiListPurge(`${storeName}_query`)();
		actionApiFormPurge(`${filesSystemListStoreName}_query`)();
		actionApiListPurge(`${filesSystemListStoreName}_query`)();
		actionApiFormPurge(`${storeName}_parentFolder`)();
		actionApiListPurge(`${storeName}_parentFolder`)();
	}, [
		storeName,
		filesSystemListStoreName,
	]);

	return <React.Fragment>
		{allowSelectSystem
			&& <Box maxWidth="180px">
				<FormSystemId querySource={querySource} initialFilter={systemInitialFilter} />
			</Box>}
		{(systemId && parentId)
			? <StyledWrapper 
				{ ...props }
				querySource={querySource}
				apiUrl={apiUrl.replace(':id', systemId)} 
				ManageComponent={() => <PaperManager systemId={systemId} />}>
				<Box pb={2}>
					<MenuBreadcrumbs 
						name={storeName}
						onClick={onBreadcrumbs} />
				</Box>
				<TableManager 
					querySource={querySource}
					withContextMenu={withContextMenu}
					bulkDeletion={bulkDeletion}
					onCheck={onCheck}
					onFolder={onFolder}
					onFile={onFile} />
			</StyledWrapper>
			: <Box 
				pt={2}
				display="flex"
				justifyContent="center">
				<Typography
					component="div"
					variant="caption"
					color="textSecondary">
					No file system selected.
				</Typography>
			</Box>}
	</React.Fragment>;
};

let Store = ({ 
	systemId: propsSystemId, 
	allowSelectSystem,
	...props 
}) => {
	const serviceName = React.useContext(ContextService);
	const { 
		[serviceName]: { 
			filesSystemList: {
				storeName: filesSystemListStoreName,
			},
		}, 
	} = React.useContext(ContextProps);
	const systemId = useSelector(selectorMainExtract([ 'api', 'list', filesSystemListStoreName, 'systemId' ]));
	const parentId = useSelector(selectorMainExtract([ 'api', 'list', filesSystemListStoreName, 'parentId' ]));

	return <Manager
		{ ...props }
		allowSelectSystem={allowSelectSystem}
		systemId={allowSelectSystem
			? (systemId ?? propsSystemId)
			: (propsSystemId ?? systemId)}
		parentId={parentId}
		querySource="store" />;
};

let Url = ({ 
	systemId: propsSystemId, 
	allowSelectSystem,
	...props 
}) => {
	const { search } = useLocation();
	const systemId = String(hookUrlFilterItem('systemId', search) ?? '');
	const parentId = String(hookUrlFilterItem('parentId', search) ?? '');
	const filterWrapper = React.useCallback((data) => {
		data = JSON.parse(data);

		delete data['systemId'];
		return (utilsCheckObjFilled(data))
			? JSON.stringify(data)
			: undefined;
	}, [
	]);

	return <Manager
		{ ...props }
		allowSelectSystem={allowSelectSystem}
		systemId={allowSelectSystem
			? (systemId ?? propsSystemId)
			: (propsSystemId ?? systemId)}
		parentId={parentId}
		filterWrapper={filterWrapper}
		querySource="url" />;
};

let StoreUrl = ({ querySource, ...props }) => {
	return (querySource === 'url')
		? <Url { ...props } />
		: <Store { ...props } />
};

StoreUrl = React.memo(StoreUrl);
StoreUrl.defaultProps = {
	querySource: 'url',
	onFile: () => {},
	onFolder: () => {},
	allowSelectSystem: true,
};
StoreUrl.propManagers = {
	querySource: PropTypes.string,
	onFile: PropTypes.func,
	onFolder: PropTypes.onFolder,
	allowSelectSystem: PropTypes.bool,
};

export default StoreUrl;
