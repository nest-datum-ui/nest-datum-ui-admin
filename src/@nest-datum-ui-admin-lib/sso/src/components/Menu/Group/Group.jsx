import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		sso: { 
			ssoUser,
			ssoRole,
			ssoAccess,
			ssoSetting,
		}, 
	} = React.useContext(ContextProps);
	const { pathname, search } = useLocation();
	const isUsersGroup = pathname.indexOf(ssoUser.pageFullUrl) === 0;
	const isUsersGroupOptions = pathname.indexOf(`${ssoUser.pageFullUrl}/options`) === 0;
	const isUsersGroupStatuses = pathname.indexOf(`${ssoUser.pageFullUrl}/statuses`) === 0;
	const isRolesGroup = pathname.indexOf(ssoRole.pageFullUrl) === 0;
	const isRolesGroupOptions = pathname.indexOf(`${ssoRole.pageFullUrl}/options`) === 0;
	const isRolesGroupStatuses = pathname.indexOf(`${ssoRole.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(ssoAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${ssoAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${ssoAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(ssoSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isUsersGroup
					? [{
						flag: (pathname.length > ssoUser.pageFullUrl.length && (isUsersGroupOptions || isUsersGroupStatuses)),
						to: ssoUser.pageFullUrl + search,
					}]
					: (isRolesGroup
						? [{
							flag: (pathname.length > ssoRole.pageFullUrl.length && (isRolesGroupOptions || isRolesGroupStatuses)),
							to: ssoRole.pageFullUrl + search,
						}]
						: (isAccessesGroup
							? [{
								flag: (pathname.length > ssoAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
								to: ssoAccess.pageFullUrl + search,
							}]
							: [])),
			}, {
				text: 'Options',
				check: isUsersGroup
					? [{
						flag: !isUsersGroupOptions,
						to: `${ssoUser.pageFullUrl}/options${search}`,
					}]
					: (isRolesGroup
						? [{
							flag: !isRolesGroupOptions,
							to: `${ssoRole.pageFullUrl}/options${search}`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${ssoAccess.pageFullUrl}/options${search}`,
							}]
							: [])),
			}, {
				text: 'Statuses',
				check: isUsersGroup
					? [{
						flag: !isUsersGroupStatuses,
						to: `${ssoUser.pageFullUrl}/statuses${search}`,
					}]
					: (isRolesGroup
						? [{
							flag: !isRolesGroupStatuses,
							to: `${ssoRole.pageFullUrl}/statuses${search}`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupStatuses,
								to: `${ssoAccess.pageFullUrl}/statuses${search}`,
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
