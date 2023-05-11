import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContextProps } from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import { actionSsoRecovery } from '../../Store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Field from '@nest-datum-ui/Field';
import InputEmail from '@nest-datum-ui/Input/Email';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import ButtonLink from '@nest-datum-ui/Button/Link';
import StyledWrapper from './Styled/Wrapper.jsx';

let Recovery = ({
	onSubmit,
	...props
}) => {
	const { sso: { ssoRecovery: { id, storeName, apiFullUrl } } } = React.useContext(ContextProps);
	const successfulRequestFlag = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'successfulRequestFlag' ]));
	const onSubmitWrapper = React.useCallback((e) => {
		actionSsoRecovery(storeName, apiFullUrl);
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
		{(successfulRequestFlag === true)
			? <React.Fragment>
				<Typography	component="div">
					A link to restore access has been sent to your email.
				</Typography>
			</React.Fragment>
			: <React.Fragment>
				<Box py={2}>
					<Field
						Component={InputEmail}
						name="email"
						required />
				</Box>
				<ButtonPrimary type="submit" form={id} startIcon={<SendIcon />}>
					<b>Send</b>
				</ButtonPrimary>
				<Box pt={2}>
					<ButtonLink to={process.env.ROUTE_SiGN_IN}>
						<Typography component="div">
							Sign in
						</Typography>
					</ButtonLink>
					<ButtonLink to={process.env.ROUTE_SiGN_UP}>
						<Typography component="div">
							Sign up
						</Typography>
					</ButtonLink>
				</Box>
			</React.Fragment>}
	</StyledWrapper>;
};

Recovery = React.memo(Recovery);
Recovery.defaultProps = {
	onSubmit: () => {},
};
Recovery.propTypes = {
	onSubmit: PropTypes.func,
};

export default Recovery;
