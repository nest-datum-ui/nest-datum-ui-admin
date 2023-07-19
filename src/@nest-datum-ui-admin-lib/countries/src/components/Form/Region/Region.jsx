import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionDialogOpen,
	actionApiFormRestore,
} from '@nest-datum-ui/Store';
import { 
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Field from '@nest-datum-ui/Field';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import FormOptionValue from 'components/Form/Option/Value';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import ListRelation from 'components/List/Relation';
import Select from 'components/Select';
import InputId from 'components/Input/Id';
import InputName from 'components/Input/Name';
import InputDescription from 'components/Input/Description';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import DialogDropForce from 'components/Dialog/Drop/Force';
import DialogContentRelation from '../../Dialog/Content/Relation';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Region = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: {
				statusListName,
				optionName,
				optionFormName,
				optionListName,
				storeName,
				apiFullUrl: apiUrl,
				id,
				relationContentListName,
			}, 
			countriesTypeList: {
				storeName: typeStoreName,
				apiFullUrl: typeApiUrl,
			},
			countriesRegionList: {
				storeName: regionStoreName,
				apiFullUrl: regionApiUrl,
			},
			countriesTypeOptionList: {
				apiFullUrl: relationApiUrl,
			},
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[statusListName]: { 
				storeName: statusStoreName, 
				apiFullUrl: statusApiUrl,
			}, 
			[optionFormName]: {
				relationListName: optionRelationListName,
			}, 
			[optionListName]: {
				storeName: optionListStoreName,
			},
			[optionName]: {
				fieldsBlock,
			},
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: {
			[optionRelationListName]: {
				entity: optionRelationListEntity,
				entityOptionRelation: optionRelationListEntityOptionRelation,
				formName: optionRelationListFormName,
			},
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: {
			[optionRelationListFormName]: {
				post: {
					apiFullUrl: optionRelationListApiUrl,
				},
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isDeleted' ]));
	const onDrop = React.useCallback(() => actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId })(), [
		entityId,
		isDeleted,
	]);
	const onRestore = React.useCallback(() => actionApiFormRestore(storeName, { apiUrl, entityId })(), [
		storeName,
		apiUrl,
		entityId,
	]);
	const onSubmitWrapper = React.useCallback((e) => handlerSubmit(e, { 
		storeName, 
		optionListStoreName, 
		optionRelationListEntity, 
		optionRelationListEntityOptionRelation, 
		apiUrl, 
		optionRelationListApiUrl, 
		entityId, 
	}), [
		entityId,
		storeName,
		optionListStoreName,
		optionRelationListEntity,
		optionRelationListEntityOptionRelation,
		apiUrl,
		optionRelationListApiUrl,
	]);
	const initialFilter = React.useMemo(() => ({ regionId: entityId }), [
		entityId,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender>
		<Box py={1}>
			<Field
				Component={InputId}
				form={id}
				name="id" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputName}
				form={id}
				name="name"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputDescription}
				form={id}
				name="description" />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={typeStoreName}
					apiUrl={typeApiUrl} />)}
				form={id}
				itemKey="name"
				name="typeId"
				label="Type"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={regionStoreName}
					apiUrl={regionApiUrl} />)}
				form={id}
				itemKey="name"
				name="parentId"
				label="Parent"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={statusStoreName}
					apiUrl={statusApiUrl} />)}
				form={id}
				itemKey="name"
				name="regionStatusId"
				label="Status"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsNotDelete}
				form={id}
				type="checkbox"
				name="isNotDelete" />
		</Box>
		{(utilsCheckStrIdExists(entityId) && fieldsBlock) 
			&& <FormOptionValue loadOnFirstRender entityId={entityId} />}
		<Box pb={2}>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
						Save
					</ButtonPrimary>
				</Grid>
				{(!isNotDelete && isDeleted)
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary startIcon={<SettingsBackupRestoreIcon />} onClick={onRestore}>
							Restore
						</ButtonPrimary>
					</Grid>}
				{(!isNotDelete && utilsCheckStrId(entityId))
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary color="error" startIcon={<DeleteIcon />} onClick={onDrop}>
							{isDeleted
								? 'Delete'
								: 'Disable'}
						</ButtonPrimary>
					</Grid>}
			</Grid>
			{utilsCheckStrIdExists(entityId) 
				&& <ContextRoute.Provider value={relationContentListName}>
					<Box py={2}>
						<Divider />
					</Box>
					<ListRelation 
						initialFilter={initialFilter}
						BottomComponent={<React.Fragment>
							<DialogDropForce reloadImmediately type="list" />
							<DialogContentRelation />
						</React.Fragment>}
						Component={({ 
							id, 
							typeOptionId, 
							isDeleted, 
						}) => <TypographyFetch 
							key={id ?? typeOptionId} 
							apiUrl={relationApiUrl}>
								{typeOptionId}
							</TypographyFetch>} />
				</ContextRoute.Provider>}
		</Box>
		<DialogDrop redirect />
		<DialogDisable />
	</StyledWrapper>;
};

Region = React.memo(Region);
Region.defaultProps = {
};
Region.propTypes = {
};

export default Region;
