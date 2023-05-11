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
	actionApiFormUpdate,
	actionDialogClose,
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
			}, 
		},
	} = React.useContext(ContextProps);
	const {
		[serviceName]: {
			[formName]: {
				id,
				storeName,
				apiFullUrl: apiUrl,
				post: {
					apiFullUrl: apiPostUrl,
				},
			},
			formsFieldList: {
				apiFullUrl: formsFieldListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const fieldDataLength = useSelector(selectorMainExtract([ 'api', 'list', id, 'data', 'length' ]));
	const fieldId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'fieldId' ]));
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
		if (fieldContentId) {
			actionApiFormUpdate(storeName, { 
				apiUrl, 
				entityId: fieldContentId, 
			})(() => {
				actionDialogClose('relation')();
			});
		}
		else {
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
				apiUrl: apiPostUrl, 
				entityId, 
				fields: [{
					name: 'fieldId',
					isRequired: true,
					check: [ utilsCheckStrIdExists ],
				}, {
					name: 'value',
					check,
				}], 
			});
		}
	}, [
		storeName,
		listStoreName,
		dataTypeId,
		entityId,
		fieldContentId,
		apiPostUrl,
		apiUrl,
	]);
	const filterMemo = React.useMemo(() => ({ 
		formFields: { 
			formId: (Store()
				.getState()
				.api
				.form['forms-content-form'] || {})['formId'], 
		}, 
	}), [
	]);

	React.useEffect(() => {
		if (utilsCheckStrIdExists(fieldContentId)
			&& utilsCheckStrIdExists(fieldId)
			&& fieldDataLength > 0) {
			const dataTypeId = ((((Store()
				.getState()
				.api
				.list[id] || {})
				.data || [])
				.filter((item) => item['id'] === fieldId))[0] || {})['dataTypeId'];

			actionApiFormProp(storeName, 'dataTypeId', dataTypeId)();
		}
	}, [
		storeName,
		fieldContentId,
		fieldId,
		id,
		fieldDataLength,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		entityId={fieldContentId}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender={!!fieldContentId}>
		<Box py={1}>
			<Field 
				Component={Select} 
				form={storeName} 
				apiUrl={formsFieldListApiUrl}
				filter={filterMemo}
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
