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
import RouteCompanyList from './routes/Company/List';
import RouteCompanyForm from './routes/Company/Form';
import RouteCompanyOptionList from './routes/Company/Option/List';
import RouteCompanyOptionForm from './routes/Company/Option/Form';
import RouteCompanyStatusList from './routes/Company/Status/List';
import RouteCompanyStatusForm from './routes/Company/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Jobs = () => {
	const { 
		jobs: { 
			pageBaseUrl, 
			jobsAccess,
			jobsAccessOption,
			jobsAccessStatus,
			jobsSetting,
			jobsPost,
			jobsPostOption,
			jobsPostStatus,
			jobsCategory,
			jobsCategoryOption,
			jobsCategoryStatus,
			jobsCompany,
			jobsCompanyOption,
			jobsCompanyStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="jobs">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RoutePostList />} />
				<Route
					path={jobsPost.pageUrl}
					element={<RoutePostList />} />
				<Route
					path={`${jobsPost.pageUrl}/:entityId`}
					element={<RoutePostForm />} />
				<Route
					path={jobsPostOption.pageUrl}
					element={<RoutePostOptionList />} />
				<Route
					path={`${jobsPostOption.pageUrl}/:entityId`}
					element={<RoutePostOptionForm />} />
				<Route
					path={jobsPostStatus.pageUrl}
					element={<RoutePostStatusList />} />
				<Route
					path={`${jobsPostStatus.pageUrl}/:entityId`}
					element={<RoutePostStatusForm />} />
				<Route
					path={jobsCategory.pageUrl}
					element={<RouteCategoryList />} />
				<Route
					path={`${jobsCategory.pageUrl}/:entityId`}
					element={<RouteCategoryForm />} />
				<Route
					path={jobsCategoryOption.pageUrl}
					element={<RouteCategoryOptionList />} />
				<Route
					path={`${jobsCategoryOption.pageUrl}/:entityId`}
					element={<RouteCategoryOptionForm />} />
				<Route
					path={jobsCategoryStatus.pageUrl}
					element={<RouteCategoryStatusList />} />
				<Route
					path={`${jobsCategoryStatus.pageUrl}/:entityId`}
					element={<RouteCategoryStatusForm />} />
				<Route
					path={jobsCompany.pageUrl}
					element={<RouteCompanyList />} />
				<Route
					path={`${jobsCompany.pageUrl}/:entityId`}
					element={<RouteCompanyForm />} />
				<Route
					path={jobsCompanyOption.pageUrl}
					element={<RouteCompanyOptionList />} />
				<Route
					path={`${jobsCompanyOption.pageUrl}/:entityId`}
					element={<RouteCompanyOptionForm />} />
				<Route
					path={jobsCompanyStatus.pageUrl}
					element={<RouteCompanyStatusList />} />
				<Route
					path={`${jobsCompanyStatus.pageUrl}/:entityId`}
					element={<RouteCompanyStatusForm />} />
				<Route
					path={jobsAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${jobsAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={jobsAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${jobsAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={jobsAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${jobsAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={jobsSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${jobsSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Jobs = React.memo(Jobs);
Jobs.defaultProps = {
};
Jobs.propCategorys = {
};

export default Jobs;
