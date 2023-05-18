import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		dictionary: { 
			dictionaryAccess,
			dictionarySetting,
			dictionaryPost,
			dictionaryCategory,
		}, 
	} = React.useContext(ContextProps);
	const { pathname, search } = useLocation();
	const isPostGroup = pathname.indexOf(dictionaryPost.pageFullUrl) === 0;
	const isPostGroupOptions = pathname.indexOf(`${dictionaryPost.pageFullUrl}/options`) === 0;
	const isPostGroupStatuses = pathname.indexOf(`${dictionaryPost.pageFullUrl}/statuses`) === 0;
	const isCategoryGroup = pathname.indexOf(dictionaryCategory.pageFullUrl) === 0;
	const isCategoryGroupOptions = pathname.indexOf(`${dictionaryCategory.pageFullUrl}/options`) === 0;
	const isCategoryGroupStatuses = pathname.indexOf(`${dictionaryCategory.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(dictionaryAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${dictionaryAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${dictionaryAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(dictionarySetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isPostGroup
					? [{
						flag: (pathname.length > dictionaryPost.pageFullUrl.length && (isPostGroupOptions || isPostGroupStatuses)),
						to: dictionaryPost.pageFullUrl + search,
					}]
					: (isCategoryGroup
						? [{
							flag: (pathname.length > dictionaryCategory.pageFullUrl.length && (isCategoryGroupOptions || isCategoryGroupStatuses)),
							to: dictionaryCategory.pageFullUrl + search,
						}]
						: (isAccessesGroup
							? [{
								flag: (pathname.length > dictionaryAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
								to: dictionaryAccess.pageFullUrl + search,
							}]
							: [])),
			}, {
				text: 'Options',
				check: isPostGroup
					? [{
						flag: !isPostGroupOptions,
						to: `${dictionaryPost.pageFullUrl}/options${search}`,
					}]
					: (isCategoryGroup
						? [{
							flag: !isCategoryGroupOptions,
							to: `${dictionaryCategory.pageFullUrl}/options${search}`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${dictionaryAccess.pageFullUrl}/options${search}`,
							}]
							: [])),
			}, {
				text: 'Statuses',
				check: isPostGroup
					? [{
						flag: !isPostGroupStatuses,
						to: `${dictionaryPost.pageFullUrl}/statuses${search}`,
					}]
					: (isCategoryGroup
						? [{
							flag: !isCategoryGroupStatuses,
							to: `${dictionaryCategory.pageFullUrl}/statuses${search}`,
						}]
						: (isAccessesGroup
							? [{
								flag: !isAccessesGroupStatuses,
								to: `${dictionaryAccess.pageFullUrl}/statuses${search}`,
							}]
							: [])),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};

export default Group;
