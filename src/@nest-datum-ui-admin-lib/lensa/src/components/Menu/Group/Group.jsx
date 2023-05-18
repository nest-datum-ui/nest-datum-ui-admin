import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		lensa: { 
			lensaAccess,
			lensaSetting,
			lensaReport,
		}, 
	} = React.useContext(ContextProps);
	const { pathname, search } = useLocation();
	const isReportGroup = pathname.indexOf(lensaReport.pageFullUrl) === 0;
	const isAccessesGroup = pathname.indexOf(lensaAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${lensaAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${lensaAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(lensaSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([
				...isReportGroup
					? []
					: [{
						text: 'Data',
						check: isAccessesGroup
							? [{
								flag: (pathname.length > lensaAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
								to: lensaAccess.pageFullUrl + search,
							}]
							: [],
					}, {
						text: 'Options',
						check: (isAccessesGroup
							? [{
								flag: !isAccessesGroupOptions,
								to: `${lensaAccess.pageFullUrl}/options${search}`,
							}]
							: []),
					}, {
						text: 'Statuses',
						check: isAccessesGroup
							? [{
								flag: !isAccessesGroupStatuses,
								to: `${lensaAccess.pageFullUrl}/statuses${search}`,
							}]
							: [],
					}], 
			])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
