import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		cv: { 
			cvAccess,
			cvSetting,
			cvReport,
		}, 
	} = React.useContext(ContextProps);
	const { pathname, search } = useLocation();
	const isReportGroup = pathname.indexOf(cvReport.pageFullUrl) === 0;
	const isReportGroupStatuses = pathname.indexOf(`${cvReport.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(cvAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${cvAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${cvAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(cvSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isReportGroup
					? [{
						flag: (pathname.length > cvReport.pageFullUrl.length && isReportGroupStatuses),
						to: cvReport.pageFullUrl + search,
					}]
					: (isAccessesGroup
						? [{
							flag: (pathname.length > cvAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
							to: cvAccess.pageFullUrl + search,
						}]
						: []),
			}, 
			...isReportGroup
				? []
				: [{
					text: 'Options',
					check: (isAccessesGroup
						? [{
							flag: !isAccessesGroupOptions,
							to: `${cvAccess.pageFullUrl}/options${search}`,
						}]
						: []),
				}], 
			{
				text: 'Statuses',
				check: isReportGroup
					? [{
						flag: !isReportGroupStatuses,
						to: `${cvReport.pageFullUrl}/statuses`,
					}]
					: (isAccessesGroup
						? [{
<<<<<<< HEAD
							flag: !isReportGroupStatuses,
							to: `${cvReport.pageFullUrl}/statuses${search}`,
=======
							flag: !isAccessesGroupStatuses,
							to: `${cvAccess.pageFullUrl}/statuses`,
>>>>>>> 55dc49e07228eb7b65aaa6caded572c8a22c731b
						}]
						: []),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
