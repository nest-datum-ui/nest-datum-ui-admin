import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		countries: { 
			countriesAccess,
			countriesSetting,
			countriesRegion,
			countriesType,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isRegionGroup = pathname.indexOf(countriesRegion.pageFullUrl) === 0;
	const isRegionGroupOptions = pathname.indexOf(`${countriesRegion.pageFullUrl}/options`) === 0;
	const isRegionGroupStatuses = pathname.indexOf(`${countriesRegion.pageFullUrl}/statuses`) === 0;
	const isTypeGroup = pathname.indexOf(countriesType.pageFullUrl) === 0;
	const isTypeGroupOptions = pathname.indexOf(`${countriesType.pageFullUrl}/options`) === 0;
	const isTypeGroupStatuses = pathname.indexOf(`${countriesType.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(countriesAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${countriesAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${countriesAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(countriesSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isRegionGroup
					? [{
						flag: (pathname.length > countriesRegion.pageFullUrl.length && (isRegionGroupOptions || isRegionGroupStatuses)),
						to: countriesRegion.pageFullUrl,
					}]
					: (isTypeGroup
						? [{
							flag: (pathname.length > countriesType.pageFullUrl.length && (isTypeGroupOptions || isTypeGroupStatuses)),
							to: countriesType.pageFullUrl,
						}]
						: (isAccessesGroup
							? [{
								flag: (pathname.length > countriesAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
								to: countriesAccess.pageFullUrl,
							}]
							: [])),
			}, {
				text: 'Options',
				check: isRegionGroup
					? [{
						flag: !isRegionGroupOptions,
						to: `${countriesRegion.pageFullUrl}/options`,
					}]
					: (isTypeGroup
						? [{
							flag: !isTypeGroupOptions,
							to: `${countriesType.pageFullUrl}/options`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${countriesAccess.pageFullUrl}/options`,
							}]
							: [])),
			}, {
				text: 'Statuses',
				check: isRegionGroup
					? [{
						flag: !isRegionGroupStatuses,
						to: `${countriesRegion.pageFullUrl}/statuses`,
					}]
					: (isTypeGroup
						? [{
							flag: !isTypeGroupStatuses,
							to: `${countriesType.pageFullUrl}/statuses`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupStatuses,
								to: `${countriesAccess.pageFullUrl}/statuses`,
							}]
							: [])),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
