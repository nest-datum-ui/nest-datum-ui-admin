import React from 'react';
import { useSelector } from 'react-redux';
import { ContextProps } from '@nest-datum-ui/Context';
import { 
	hookUrlNavigate,
	selectorMainExtract, 
} from '@nest-datum-ui/Store';
import { actionSsoVerify } from '../../Store';
import Typography from '@mui/material/Typography';
import Progress from '@nest-datum-ui/Progress';
import StyledWrapper from './Styled/Wrapper.jsx';

let Verify = (props) => {
	const { 
		sso: {
			ssoVerify: { 
				storeName, 
				apiFullUrl,  
			}, 
		},
		sso: { 
			ssoSignIn: { 
				pageFullUrl, 
			}, 
		}
	} = React.useContext(ContextProps);
	const resultMessage = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'resultMessage' ]));

	React.useEffect(() => {
		(async () => {
			if (await actionSsoVerify(storeName, apiFullUrl, process.env.ROUTE_SiGN_IN)) {
				setTimeout(() => hookUrlNavigate(pageFullUrl), 2000);
			}
		})();
	}, [
		pageFullUrl,
		apiFullUrl,
		storeName,
	]);

	return <StyledWrapper { ...props }>
		<Progress visible={!resultMessage} />
		{resultMessage
			&& <Typography component="div">
				{resultMessage}
			</Typography>}
	</StyledWrapper>;
};

Verify = React.memo(Verify);
Verify.defaultProps = {
};
Verify.propTypes = {
};

export default Verify;
