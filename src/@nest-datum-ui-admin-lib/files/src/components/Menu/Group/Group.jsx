import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		files: { 
			filesAccess,
			filesSetting,
			filesManager,
			filesProvider,
			filesSystem,
		}, 
	} = React.useContext(ContextProps);
	const { pathname, search } = useLocation();
	const isProviderGroup = pathname.indexOf(filesProvider.pageFullUrl) === 0;
	const isProviderGroupOptions = pathname.indexOf(`${filesProvider.pageFullUrl}/options`) === 0;
	const isProviderGroupStatuses = pathname.indexOf(`${filesProvider.pageFullUrl}/statuses`) === 0;
	const isSystemGroup = pathname.indexOf(filesSystem.pageFullUrl) === 0;
	const isSystemGroupOptions = pathname.indexOf(`${filesSystem.pageFullUrl}/options`) === 0;
	const isSystemGroupStatuses = pathname.indexOf(`${filesSystem.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(filesAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${filesAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${filesAccess.pageFullUrl}/statuses`) === 0;

	return ((pathname.indexOf(filesSetting.pageFullUrl) === -1)
		&& (pathname.indexOf(filesManager.pageFullUrl) === -1))
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isProviderGroup
					? [{
						flag: (pathname.length > filesProvider.pageFullUrl.length && (isProviderGroupOptions || isProviderGroupStatuses)),
						to: filesProvider.pageFullUrl + search,
					}]
					: (isSystemGroup
						? [{
							flag: (pathname.length > filesSystem.pageFullUrl.length && (isSystemGroupOptions || isSystemGroupStatuses)),
							to: filesSystem.pageFullUrl + search,
						}]
						: (isAccessesGroup
							? [{
								flag: (pathname.length > filesAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
								to: filesAccess.pageFullUrl + search,
							}]
							: [])),
			}, {
				text: 'Options',
				check: isProviderGroup
					? [{
						flag: !isProviderGroupOptions,
						to: `${filesProvider.pageFullUrl}/options${search}`,
					}]
					: (isSystemGroup
						? [{
							flag: !isSystemGroupOptions,
							to: `${filesSystem.pageFullUrl}/options${search}`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${filesAccess.pageFullUrl}/options${search}`,
							}]
							: [])),
			}, {
				text: 'Statuses',
				check: isProviderGroup
					? [{
						flag: !isProviderGroupStatuses,
						to: `${filesProvider.pageFullUrl}/statuses${search}`,
					}]
					: (isSystemGroup
						? [{
							flag: !isSystemGroupStatuses,
							to: `${filesSystem.pageFullUrl}/statuses${search}`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupStatuses,
								to: `${filesAccess.pageFullUrl}/statuses${search}`,
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
