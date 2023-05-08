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

let Relation = ({ children, postContentId, ...props }) => {
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
			dictionaryCategoryOptionList: {
				apiFullUrl: dictionaryCategoryOptionListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const categoryOptionDataLength = useSelector(selectorMainExtract([ 'api', 'list', id, 'data', 'length' ]));
	const categoryOptionId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'categoryOptionId' ]));
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'dataTypeId' ]));
	const onCategoryOption = React.useCallback((e) => {
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
		if (postContentId) {
			actionApiFormUpdate(storeName, { 
				apiUrl, 
				entityId: postContentId, 
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
					name: 'categoryOptionId',
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
		postContentId,
		apiPostUrl,
		apiUrl,
	]);
	const filterMemo = React.useMemo(() => ({ 
		categoryCategoryOptions: { 
			categoryId: (Store()
				.getState()
				.api
				.form['dictionary-post-form'] || {})['categoryId'], 
		}, 
	}), [
	]);

	React.useEffect(() => {
		if (utilsCheckStrIdExists(postContentId)
			&& utilsCheckStrIdExists(categoryOptionId)
			&& categoryOptionDataLength > 0) {
			const dataTypeId = ((((Store()
				.getState()
				.api
				.list[id] || {})
				.data || [])
				.filter((item) => item['id'] === categoryOptionId))[0] || {})['dataTypeId'];

			actionApiFormProp(storeName, 'dataTypeId', dataTypeId)();
		}
	}, [
		storeName,
		postContentId,
		categoryOptionId,
		id,
		categoryOptionDataLength,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		entityId={postContentId}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender={!!postContentId}>
		<Box py={1}>
			<Field 
				Component={Select} 
				form={storeName} 
				apiUrl={dictionaryCategoryOptionListApiUrl}
				filter={filterMemo}
				onChange={onCategoryOption}
				name="categoryOptionId"
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
