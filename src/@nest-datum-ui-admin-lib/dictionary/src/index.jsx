import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import { 
	ContextService,
	ContextProps, 
} from '@nest-datum-ui/Context';
import Layout from './layouts';
import RoutePostList from './routes/Post/List';
import RoutePostForm from './routes/Post/Form';
import RoutePostOptionList from './routes/Post/Option/List';
import RoutePostOptionForm from './routes/Post/Option/Form';
import RoutePostStatusList from './routes/Post/Status/List';
import RoutePostStatusForm from './routes/Post/Status/Form';
import RouteCategoryList from './routes/Category/List';
import RouteCategoryForm from './routes/Category/Form';
import RouteCategoryOptionList from './routes/Category/Option/List';
import RouteCategoryOptionForm from './routes/Category/Option/Form';
import RouteCategoryStatusList from './routes/Category/Status/List';
import RouteCategoryStatusForm from './routes/Category/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Dictionary = () => {
	const { 
		dictionary: { 
			pageBaseUrl, 
			dictionaryAccess,
			dictionaryAccessOption,
			dictionaryAccessStatus,
			dictionarySetting,
			dictionaryPost,
			dictionaryPostOption,
			dictionaryPostStatus,
			dictionaryCategory,
			dictionaryCategoryOption,
			dictionaryCategoryStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="dictionary">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RoutePostList />} />
				<Route
					path={dictionaryPost.pageUrl}
					element={<RoutePostList />} />
				<Route
					path={`${dictionaryPost.pageUrl}/:entityId`}
					element={<RoutePostForm />} />
				<Route
					path={dictionaryPostOption.pageUrl}
					element={<RoutePostOptionList />} />
				<Route
					path={`${dictionaryPostOption.pageUrl}/:entityId`}
					element={<RoutePostOptionForm />} />
				<Route
					path={dictionaryPostStatus.pageUrl}
					element={<RoutePostStatusList />} />
				<Route
					path={`${dictionaryPostStatus.pageUrl}/:entityId`}
					element={<RoutePostStatusForm />} />
				<Route
					path={dictionaryCategory.pageUrl}
					element={<RouteCategoryList />} />
				<Route
					path={`${dictionaryCategory.pageUrl}/:entityId`}
					element={<RouteCategoryForm />} />
				<Route
					path={dictionaryCategoryOption.pageUrl}
					element={<RouteCategoryOptionList />} />
				<Route
					path={`${dictionaryCategoryOption.pageUrl}/:entityId`}
					element={<RouteCategoryOptionForm />} />
				<Route
					path={dictionaryCategoryStatus.pageUrl}
					element={<RouteCategoryStatusList />} />
				<Route
					path={`${dictionaryCategoryStatus.pageUrl}/:entityId`}
					element={<RouteCategoryStatusForm />} />
				<Route
					path={dictionaryAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${dictionaryAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={dictionaryAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${dictionaryAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={dictionaryAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${dictionaryAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={dictionarySetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${dictionarySetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Dictionary = React.memo(Dictionary);
Dictionary.defaultProps = {
};
Dictionary.propCategorys = {
};

export default Dictionary;
