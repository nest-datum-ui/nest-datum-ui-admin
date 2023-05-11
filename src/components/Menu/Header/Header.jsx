import React from 'react';
import { ContextProps } from '@nest-datum-ui/Context';
import { actionSsoLogout } from '@nest-datum-ui-admin-lib/sso/src/components/Store';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import StyledWrapper from './Styled/Wrapper.jsx';

let Header = (props) => {
	const { 
		sso: { 
			ssoSignIn: { 
				storeName, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const onExit = React.useCallback(() => actionSsoLogout(storeName), [
		storeName,
	]);

	return <StyledWrapper { ...props }>
		<MenuItem disabled>
			<ListItemText>
				Account
			</ListItemText>
		</MenuItem>
		<MenuItem disabled>
			<ListItemText>
				Language
			</ListItemText>
		</MenuItem>
		<MenuItem disabled>
			<ListItemText>
				Clear cache
			</ListItemText>
		</MenuItem>
		<MenuItem disabled>
			<ListItemText>
				Reload all services
			</ListItemText>
		</MenuItem>
		<MenuItem disabled>
			<ListItemText>
				Rebuild frontend
			</ListItemText>
		</MenuItem>
		<MenuItem onClick={onExit}>
			<ListItemText>
				Exit
			</ListItemText>
		</MenuItem>
	</StyledWrapper>;
};

Header = React.memo(Header);
Header.defaultProps = {
};
Header.propTypes = {
};

export default Header;
