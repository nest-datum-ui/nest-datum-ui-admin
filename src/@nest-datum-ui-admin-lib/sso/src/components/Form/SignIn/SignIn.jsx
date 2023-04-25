import React from 'react';
import PropTypes from 'prop-types';
import { ContextProps } from '@nest-datum-ui/Context';
import { actionSsoLogin } from '../../Store';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Field from '@nest-datum-ui/Field';
import InputText from '@nest-datum-ui/Input/Text';
import InputPassword from '@nest-datum-ui/Input/Password';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import StyledWrapper from './Styled/Wrapper.jsx';

let SignIn = ({
	onSubmit,
	...props
}) => {
	const { 
		sso: { 
			ssoSignIn: { 
				id, 
				storeName, 
				apiFullUrl, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const onSubmitWrapper = React.useCallback((e) => {
		actionSsoLogin(storeName, apiFullUrl);
		onSubmit(e);
	}, [
		onSubmit,
		storeName,
		apiFullUrl,
	]);

	return <StyledWrapper { ...props } 
		id={id} 
		storeName={storeName} 
		onSubmit={onSubmitWrapper}>
		<Box py={2}>
			<Field
				Component={InputText}
				form={id}
				name="login"
				placeholder="name@email.com"
				label="Login or email" />
		</Box>
		<Box py={2}>
			<Field
				Component={InputPassword}
				form={id}
				name="password"
				visibility />
		</Box>
		{console.log('id', id, storeName)}
		<ButtonPrimary type="submit" form={id} startIcon={<LoginIcon />}>
			<b>Login</b>
		</ButtonPrimary>
	</StyledWrapper>;
};

SignIn = React.memo(SignIn);
SignIn.defaultProps = {
	onSubmit: () => {},
};
SignIn.propTypes = {
	onSubmit: PropTypes.func,
};

export default SignIn;
