import React from 'react';
import { ContextProps } from '@nest-datum-ui/Context';
import { actionBreadcrumbsSet } from '@nest-datum-ui/Store';
import StyledWrapper from './Styled/Wrapper.jsx';

let Service = ({ children, ...props }) => {
	const data = React.useContext(ContextProps);
	const pathnameSplit = window.location.pathname.split('/').slice(1);
	const pathname = window.location.pathname;
	const { pageInitialFullUrl, title } = data[pathnameSplit[1]];
	
	let bread = [];
	if(pathnameSplit.length > 3) {
		for (let key in data[pathnameSplit[1]]) {
			let item = data[pathnameSplit[1]][key];
			if(item.pageFullUrl === pathname.split('/').slice(0, 4).join('/')) {
				bread.push({ text: item.breadcrumbsMenuTitle, key: item.pageFullUrl })
			}

			if(item.pageFullUrl === pathname.split('/').slice(0, 5).join('/')) {
				bread.push({ text: item.breadcrumbsMenuTitle, key: item.pageFullUrl })
			}
		}
	}

	React.useEffect(() => {
		actionBreadcrumbsSet('breadcrumbs-header', [
			...(window.location.pathname === `/${process.env.ROUTE_AUTHED}`)
				? [{
					text: '...',
					key: `/${process.env.ROUTE_AUTHED}`,
				}]
				: [{
					text: '...',
					key: `/${process.env.ROUTE_AUTHED}`,
				},
				{
					text: title,
					key: pageInitialFullUrl,
				},
				...bread
			]])();
	}, [
		pageInitialFullUrl,
		title,
	]);

	return <StyledWrapper { ...props }>
		{children}
	</StyledWrapper>;
};

Service = React.memo(Service);
Service.defaultProps = {
};
Service.propTypes = {
};

export default Service;
