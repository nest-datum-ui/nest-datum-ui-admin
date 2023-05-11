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

let Relation = ({ children, regionContentId, ...props }) => {
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
			countriesTypeOptionList: {
				apiFullUrl: countriesTypeOptionListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const typeOptionDataLength = useSelector(selectorMainExtract([ 'api', 'list', id, 'data', 'length' ]));
	const typeOptionId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'typeOptionId' ]));
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'dataTypeId' ]));
	const onTypeOption = React.useCallback((e) => {
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
		if (regionContentId) {
			actionApiFormUpdate(storeName, { 
				apiUrl, 
				entityId: regionContentId, 
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
					name: 'typeOptionId',
					required: true,
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
		regionContentId,
		apiPostUrl,
		apiUrl,
	]);
	const filterMemo = React.useMemo(() => ({ 
		typeTypeOptions: { 
			typeId: (Store()
				.getState()
				.api
				.form['countries-region-form'] || {})['typeId'], 
		}, 
	}), [
	]);

	React.useEffect(() => {
		if (utilsCheckStrIdExists(regionContentId)
			&& utilsCheckStrIdExists(typeOptionId)
			&& typeOptionDataLength > 0) {
			const dataTypeId = ((((Store()
				.getState()
				.api
				.list[id] || {})
				.data || [])
				.filter((item) => item['id'] === typeOptionId))[0] || {})['dataTypeId'];

			actionApiFormProp(storeName, 'dataTypeId', dataTypeId)();
		}
	}, [
		storeName,
		regionContentId,
		typeOptionId,
		id,
		typeOptionDataLength,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		entityId={regionContentId}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender={!!regionContentId}>
		<Box py={1}>
			<Field 
				Component={Select} 
				form={storeName} 
				apiUrl={countriesTypeOptionListApiUrl}
				filter={filterMemo}
				onChange={onTypeOption}
				name="typeOptionId"
				itemKey="name"
				label="Select option"
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
