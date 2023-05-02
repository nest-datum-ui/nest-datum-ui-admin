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
			jobsTag,
		}, 
	} = React.useContext(ContextProps);

	const { pathname, search } = useLocation();
	const isJobGroup = pathname.indexOf(jobsPost.pageFullUrl) === 0;
	const isJobGroupOptions = pathname.indexOf(`${jobsPost.pageFullUrl}/options`) === 0;
	const isJobGroupStatuses = pathname.indexOf(`${jobsPost.pageFullUrl}/statuses`) === 0;
	const isCategoryGroup = pathname.indexOf(jobsCategory.pageFullUrl) === 0;
	const isCategoryGroupOptions = pathname.indexOf(`${jobsCategory.pageFullUrl}/options`) === 0;
	const isCategoryGroupStatuses = pathname.indexOf(`${jobsCategory.pageFullUrl}/statuses`) === 0;
	const isTagGroup = pathname.indexOf(jobsTag.pageFullUrl) === 0;
	const isTagGroupOptions = pathname.indexOf(`${jobsTag.pageFullUrl}/options`) === 0;
	const isTagGroupStatuses = pathname.indexOf(`${jobsTag.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(jobsAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${jobsAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${jobsAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(jobsSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isJobGroup
					? [{
						flag: (pathname.length > jobsPost.pageFullUrl.length && (isJobGroupOptions || isJobGroupStatuses)),
						to: jobsPost.pageFullUrl + search,
					}]
					: (isCategoryGroup
						? [{
							flag: (pathname.length > jobsPost.pageFullUrl.length && (isCategoryGroupOptions || isCategoryGroupStatuses)),
							to: jobsCategory.pageFullUrl + search,
						}]
						: (isTagGroup
							? [{
								flag: (pathname.length > jobsPost.pageFullUrl.length && (isTagGroupOptions || isTagGroupStatuses)),
								to: jobsTag.pageFullUrl,
							}]
							: (isAccessesGroup
								? [{
									flag: (pathname.length > jobsAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
									to: jobsAccess.pageFullUrl,
								}]
								: []))),
			}, {
				text: 'Options',
				check: isJobGroup
					? [{
						flag: !isJobGroupOptions,
						to: `${jobsPost.pageFullUrl}/options${search}`,
					}]
					: (isCategoryGroup
						? [{
							flag: !isCategoryGroupOptions,
							to: `${jobsCategory.pageFullUrl}/options${search}`,
						}]
						: (isTagGroup
							? [{
								flag: !isTagGroupOptions,
								to: `${jobsTag.pageFullUrl}/options`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupOptions,
									to: `${jobsAccess.pageFullUrl}/options`,
								}]
								: []))),
			}, {
				text: 'Statuses',
				check: isJobGroup
					? [{
						flag: !isJobGroupStatuses,
						to: `${jobsPost.pageFullUrl}/statuses${search}`,
					}]
					: (isCategoryGroup
						? [{
							flag: !isCategoryGroupStatuses,
							to: `${jobsCategory.pageFullUrl}/statuses${search}`,
						}]
						: (isTagGroup
							? [{
								flag: !isTagGroupStatuses,
								to: `${jobsTag.pageFullUrl}/statuses`,
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
Group.propTypes = {
};

export default Group;
