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
import RouteRegionList from './routes/Region/List';
import RouteRegionForm from './routes/Region/Form';
import RouteRegionOptionList from './routes/Region/Option/List';
import RouteRegionOptionForm from './routes/Region/Option/Form';
import RouteRegionStatusList from './routes/Region/Status/List';
import RouteRegionStatusForm from './routes/Region/Status/Form';
import RouteTypeList from './routes/Type/List';
import RouteTypeForm from './routes/Type/Form';
import RouteTypeOptionList from './routes/Type/Option/List';
import RouteTypeOptionForm from './routes/Type/Option/Form';
import RouteTypeStatusList from './routes/Type/Status/List';
import RouteTypeStatusForm from './routes/Type/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Countries = () => {
	const { 
		countries: { 
			pageBaseUrl, 
			countriesAccess,
			countriesAccessOption,
			countriesAccessStatus,
			countriesSetting,
			countriesRegion,
			countriesRegionOption,
			countriesRegionStatus,
			countriesType,
			countriesTypeOption,
			countriesTypeStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="countries">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteRegionList />} />
				<Route
					path={countriesRegion.pageUrl}
					element={<RouteRegionList />} />
				<Route
					path={`${countriesRegion.pageUrl}/:entityId`}
					element={<RouteRegionForm />} />
				<Route
					path={countriesRegionOption.pageUrl}
					element={<RouteRegionOptionList />} />
				<Route
					path={`${countriesRegionOption.pageUrl}/:entityId`}
					element={<RouteRegionOptionForm />} />
				<Route
					path={countriesRegionStatus.pageUrl}
					element={<RouteRegionStatusList />} />
				<Route
					path={`${countriesRegionStatus.pageUrl}/:entityId`}
					element={<RouteRegionStatusForm />} />
				<Route
					path={countriesType.pageUrl}
					element={<RouteTypeList />} />
				<Route
					path={`${countriesType.pageUrl}/:entityId`}
					element={<RouteTypeForm />} />
				<Route
					path={countriesTypeOption.pageUrl}
					element={<RouteTypeOptionList />} />
				<Route
					path={`${countriesTypeOption.pageUrl}/:entityId`}
					element={<RouteTypeOptionForm />} />
				<Route
					path={countriesTypeStatus.pageUrl}
					element={<RouteTypeStatusList />} />
				<Route
					path={`${countriesTypeStatus.pageUrl}/:entityId`}
					element={<RouteTypeStatusForm />} />
				<Route
					path={countriesAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${countriesAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={countriesAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${countriesAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={countriesAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${countriesAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={countriesSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${countriesSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Countries = React.memo(Countries);
Countries.defaultProps = {
};
Countries.propTypes = {
};

export default Countries;
