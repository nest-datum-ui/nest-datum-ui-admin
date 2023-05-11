import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		jobs: { 
			jobsAccess,
			jobsSetting,
			jobsPost,
			jobsCategory,
			jobsCompany,
		}, 
	} = React.useContext(ContextProps);

	const { pathname, search } = useLocation();
	const isPostGroup = pathname.indexOf(jobsPost.pageFullUrl) === 0;
	const isPostGroupOptions = pathname.indexOf(`${jobsPost.pageFullUrl}/options`) === 0;
	const isPostGroupStatuses = pathname.indexOf(`${jobsPost.pageFullUrl}/statuses`) === 0;
	const isCategoryGroup = pathname.indexOf(jobsCategory.pageFullUrl) === 0;
	const isCategoryGroupOptions = pathname.indexOf(`${jobsCategory.pageFullUrl}/options`) === 0;
	const isCategoryGroupStatuses = pathname.indexOf(`${jobsCategory.pageFullUrl}/statuses`) === 0;
	const isCompanyGroup = pathname.indexOf(jobsCompany.pageFullUrl) === 0;
	const isCompanyGroupOptions = pathname.indexOf(`${jobsCompany.pageFullUrl}/options`) === 0;
	const isCompanyGroupStatuses = pathname.indexOf(`${jobsCompany.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(jobsAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${jobsAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${jobsAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(jobsSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isPostGroup
					? [{
						flag: (pathname.length > jobsPost.pageFullUrl.length && (isPostGroupOptions || isPostGroupStatuses)),
						to: jobsPost.pageFullUrl + search,
					}]
					: (isCategoryGroup
						? [{
							flag: (pathname.length > jobsCategory.pageFullUrl.length && (isCategoryGroupOptions || isCategoryGroupStatuses)),
							to: jobsCategory.pageFullUrl + search,
						}]
						: (isCompanyGroup
							? [{
								flag: (pathname.length > jobsCompany.pageFullUrl.length && (isCompanyGroupOptions || isCompanyGroupStatuses)),
								to: jobsCompany.pageFullUrl,
							}]
							: (isAccessesGroup
								? [{
									flag: (pathname.length > jobsAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
									to: jobsAccess.pageFullUrl,
								}]
								: []))),
			}, {
				text: 'Options',
				check: isPostGroup
					? [{
						flag: !isPostGroupOptions,
						to: `${jobsPost.pageFullUrl}/options${search}`,
					}]
					: (isCategoryGroup
						? [{
							flag: !isCategoryGroupOptions,
							to: `${jobsCategory.pageFullUrl}/options${search}`,
						}]
						: (isCompanyGroup
							? [{
								flag: !isCompanyGroupOptions,
								to: `${jobsCompany.pageFullUrl}/options`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupOptions,
									to: `${jobsAccess.pageFullUrl}/options`,
								}]
								: []))),
			}, {
				text: 'Statuses',
				check: isPostGroup
					? [{
						flag: !isPostGroupStatuses,
						to: `${jobsPost.pageFullUrl}/statuses${search}`,
					}]
					: (isCategoryGroup
						? [{
							flag: !isCategoryGroupStatuses,
							to: `${jobsCategory.pageFullUrl}/statuses${search}`,
						}]
						: (isCompanyGroup
							? [{
								flag: !isCompanyGroupStatuses,
								to: `${jobsCompany.pageFullUrl}/statuses`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupStatuses,
									to: `${jobsAccess.pageFullUrl}/statuses`,
								}]
								: []))),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};

export default Group;
