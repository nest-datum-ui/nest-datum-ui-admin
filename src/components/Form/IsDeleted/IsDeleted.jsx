import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import StoreRedux, {
	selectorMainExtract,
	actionApiListProp,
	actionUrlFilter,
	hookUrlFilterItem,
} from '@nest-datum-ui/Store';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

let IsDeleted = ({ value, onChange, ...props }) => {
	const [ id ] = React.useState(() => uuidv4());

	return <React.Fragment>
		<FormControl>
			<FormLabel id={id}>
				Visibility
			</FormLabel>
			<RadioGroup
				aria-labelledby={id}
				name={id}
				value={value}
				onChange={onChange}>
				<FormControlLabel
					control={<Radio />}  
					value="" 
					label="All" />
				<FormControlLabel
					control={<Radio />}  
					value="1" 
					label="Deleted" />
				<FormControlLabel
					control={<Radio />}  
					value="0" 
					label="Not deleted" />
			</RadioGroup>
		</FormControl>
	</React.Fragment>;
};

let Store = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const value = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'filter', 'isDeleted' ])) ?? '';
	const onChange = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)(() => {
			const currentFilter = (StoreRedux()
				.getState()
				.api
				.list[storeName] || {})
				.filter || {};

			if (e.target.value) {
				currentFilter['isDeleted'] = e.target.value;
			}
			else {
				delete currentFilter['isDeleted'];
			}

			actionApiListProp(storeName, 'filter', { ...currentFilter })();
		});
	}, [
		storeName,
	]);

	return <IsDeleted value={String(value)} onChange={onChange} />;
};

const Url = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const value = String(hookUrlFilterItem('isDeleted', search) ?? '');
	const onChange = React.useCallback((e) => {
		const value = e.target.value;

		actionApiListProp(storeName, 'loader', true)(() => {
			actionUrlFilter('isDeleted', value, { type: Boolean });
		});
	}, [
		storeName,
	]);

	return <IsDeleted value={String(value)} onChange={onChange} />;
};

let StoreUrl = ({ querySource, ...props }) => (querySource === 'url')
	? <Url { ...props } />
	: <Store { ...props } />;

StoreUrl = React.memo(StoreUrl);
StoreUrl.defaultProps = {
	querySource: 'url',
};
StoreUrl.propTypes = {
	querySource: PropTypes.string,
};

export default StoreUrl;
