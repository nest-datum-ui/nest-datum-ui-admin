import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import Store, { 
	selectorMainExtract,
	actionApiFormProp,
	actionApiFormMerge,
	actionApiFormRelation,
} from '@nest-datum-ui/Store';
import { 
	exists as utilsCheckExists,
	strIdExists as utilsCheckStrIdExists,
	numeric as utilsCheckNumeric,
	numericInt as utilsCheckNumericInt,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import Field from '@nest-datum-ui/Field';
import Select from 'components/Select';
import InputValue from 'components/Input/Value';
import StyledWrapper from './Styled/Wrapper.jsx';

let Relation = ({ children, fieldContentId, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: {
				storeName: listStoreName,
				formName,
				apiFullUrl: apiUrl,
			}, 
		},
	} = React.useContext(ContextProps);
	const {
		[serviceName]: {
			[formName]: {
				id,
				storeName,
			},
			formsFieldList: {
				apiFullUrl: formsFieldListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'dataTypeId' ]));
	const onField = React.useCallback((e) => {
		const dataTypeId = ((((Store()
			.getState()
			.api
			.list[id] || {})
			.data || [])
			.filter((item) => item['id'] === e.target.value))[0] || {})['dataTypeId'];

		actionApiFormProp(storeName, 'dataTypeId', '')(() => {
			actionApiFormMerge(storeName, {
				dataTypeId,
				value: (dataTypeId === 'happ-data-type-bool')
					? false
					: '',
			})();
		});
	}, [
		storeName,
		id,
	]);
	const onSubmitWrapper = React.useCallback((e) => {
		let check = [ utilsCheckExists ];

		switch (dataTypeId) {
			case 'happ-data-type-int':
				check.push(utilsCheckNumericInt);
				break;
			case 'happ-data-type-float':
				check.push(utilsCheckNumeric);
				break;
			case 'happ-data-type-bool':
				check.push(utilsCheckBool);
				break;
			default:
				break;
		}
		actionApiFormRelation(storeName, { 
			listStoreName, 
			apiUrl, 
			entityId, 
			fields: [{
				name: 'fieldId',
				required: true,
				check: [ utilsCheckStrIdExists ],
			}, {
				name: 'value',
				check,
			}], 
		});
	}, [
		storeName,
		listStoreName,
		apiUrl,
		entityId,
		dataTypeId,
	]);

	console.log('fieldContentId>>>', apiUrl, fieldContentId);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		entityId={fieldContentId}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender>
		<Box py={1}>
			<Field 
				Component={Select} 
				form={storeName} 
				apiUrl={formsFieldListApiUrl}
				filter={{ 
					formFields: { 
						formId: (Store()
							.getState()
							.api
							.form['forms-content-form'] || {})['formId'], 
					}, 
				}}
				onChange={onField}
				name="fieldId"
				itemKey="name"
				label="Select field"
				required />
		</Box>
		{utilsCheckStrIdExists(dataTypeId)
			&& <Box py={1}>
				<InputValue 
					storeName={storeName}
					name="value" />
			</Box>}
		<Box pb={2}>
			<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
				Save
			</ButtonPrimary>
		</Box>
    </StyledWrapper>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	onSubmit: () => {},
};
Relation.propTypes = {
	id: PropTypes.string,
	storeName: PropTypes.string,
	apiUrl: PropTypes.string,
	children: PropTypes.array,
};

export default Relation;
