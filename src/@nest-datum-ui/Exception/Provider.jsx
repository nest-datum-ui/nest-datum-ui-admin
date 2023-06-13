import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
	obj as utilsCheckObj,
	func as utilsCheckFunc,
	strFilled as utilsCheckStrFilled,
} from '@nest-datum-utils/check';
import ContextProvider from './Context/Provider.js'

let Provider = ({ 
	children, 
	variant, 
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const variantMemo = React.useMemo(() => variant, [
		variant,
	]);

	React.useEffect(() => {
		window.addEventListener('unhandledrejection', (e) => {
			const reason = e.reason;

			enqueueSnackbar(utilsCheckObj(reason)
				&& ((utilsCheckObj(reason.type)
					|| utilsCheckFunc(reason.type))
						&& utilsCheckStrFilled(reason.type.name))
				? <reason.MessageComponent />
				: reason.message, { variant: variantMemo });
		});
	}, [
		enqueueSnackbar,
		variantMemo,
	]);

	return <ContextProvider.Provider value={{}}>
		{children}
	</ContextProvider.Provider>;
};

Provider = React.memo(Provider);
Provider.defaultProps = {
	variant: 'error',
};
Provider.propTypes = {
	variant: PropTypes.string,
};

export default Provider;
