import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
	ContextOptions,
} from '@nest-datum-ui/Context';
import Store, { 
	selectorMainExtract,
	actionApiFormProp, 
} from '@nest-datum-ui/Store';
import { strObj as utilsCheckStrObj } from '@nest-datum-utils/check';
import { strToObj as utilsFormatStrToObj } from '@nest-datum-utils/format';
import InputMixed from '@nest-datum-ui/Input/Mixed';

let Value = ({ 
	storeName: propStoreName, 
	name, 
	value, 
	onChange, 
	...props 
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName: contextStoreName,
			}, 
		}, 
	} = React.useContext(ContextProps);
	const storeName = propStoreName ?? contextStoreName;
	const [ state, setState ] = React.useState(() => value || '');
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'dataTypeId' ]));
	const onState = React.useCallback((e) => {
		const value = (e.target.files && e.target.files.length > 0)
			? (() => {
				e.target.files['systemId'] = e.target.value['systemId'];
				e.target.files['path'] = e.target.value['path'];

				return e.target.files;
			})()
			: ((dataTypeId === 'happ-data-type-bool')
				? e.target.checked
				: e.target.value);

		actionApiFormProp(storeName, name, value)();
		onChange(e, value);
	}, [
		storeName,
		name,
		onChange,
		dataTypeId,
	]);

	React.useEffect(() => {
		if (dataTypeId) {
			const value = (((Store()
				.getState()
				.api || {})
				.form || {})[storeName] || {})[name];

			setState((currentState) => {
				const newValue = (value || '');

				if (newValue !== currentState) {
					if (dataTypeId === 'happ-data-type-date-range' && utilsCheckStrObj(newValue)) {
						return utilsFormatStrToObj(newValue);
					}
					return newValue;
				}
				return currentState;
			});
		}
	}, [
		storeName,
		name,
		dataTypeId,
		setState,
	]);

	return <ContextOptions.Provider value={{ dataTypeId, storeName }}>
		<InputMixed
			dataTypeId={dataTypeId}
			defaultValue={state}
			onChange={onState}
			name={name}
			{ ...props } />
	</ContextOptions.Provider>;
};

Value = React.memo(Value);
Value.defaultProps = {
	label: 'Value',
	onChange: () => {},
};
Value.propTypes = {
	onChange: PropTypes.func,
};

export default Value;
