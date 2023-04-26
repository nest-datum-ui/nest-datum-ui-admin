import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionDialogOpen, 
	actionApiFormRestore,
	actionApiListGet,
	actionApiFormPurge,
	actionApiListMerge,
} from '@nest-datum-ui/Store';
import { 
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Field from '@nest-datum-ui/Field';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import FormOptionValue from 'components/Form/Option/Value';
import Select from 'components/Select';
import InputName from 'components/Input/Name';
import InputDescription from 'components/Input/Description';
import InputId from 'components/Input/Id';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Tag = () => {
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
				entity: optionRelationListEntity,
				entityOptionRelation: optionRelationListEntityOptionRelation,
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[statusListName]: { 
				storeName: statusStoreName, 
				apiFullUrl: statusApiUrl,
			}, 
			[optionListName]: {
				storeName: optionListStoreName,
				apiFullUrl: optionListApiUrl,
			},
			[optionFormName]: {
				relations: {
					apiFullUrl: optionRelationListApiUrl,
				},
			}, 
			[optionName]: {
				fieldsBlock,
			},
		},
		jobs: {
			jobsTagList: {
				storeName: jobsTagListStoreName,
				apiFullUrl: jobsTagListApiUrl,
			},
			jobsCategory: {
				storeName: jobsCategoryStoreName,
				apiFullUrl: jobsCategoryApiUrl,
			},
		}, 
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const ready = useSelector(selectorMainExtract([ 'api', 'list', jobsTagListStoreName, 'ready' ]));
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
		storeName,
		optionListStoreName,
		optionRelationListEntity,
		optionRelationListEntityOptionRelation,
		apiUrl,
		optionRelationListApiUrl,
		entityId,
	]);

	React.useEffect(() => {
		if (utilsCheckStrIdExists(entityId) && ready === undefined) {
			actionApiListGet(jobsTagListStoreName, {
				apiUrl: jobsTagListApiUrl,
				filter: {
					tagTagOptions: {
						tagId: entityId,
					},
				},
			})(({ data: contentData = [] }) => {
				actionApiListGet(optionListStoreName, {
					apiUrl: optionListApiUrl,
					filter: {
						isDeleted: false,
					},
				})(({ data: optionsData = [] }) => {
					let i = 0;

					while (i < optionsData.length) {
						const optionsDataItem = optionsData[i];
						const id = optionsDataItem['id'];

						optionsData[i]['tagTagOptions'] = [{
							tagId: contentData[0]['tagId'] || '',
							tagOptionId: optionsDataItem['id'],
							id,
							tagTagTagOptions: (contentData[0]['tagTagOptions'] ?? [])
								.filter((item) => item['tagOptionId'] === optionsDataItem['id'])
								.map((item) => ({
									id: item['id'],
									tagTagOptionId: id,
									tagId: item['tagId'] || '',
									content: item['content'] ?? optionsDataItem['defaultValue'] ?? '',
								})),
							}];
						i++;
					}
					if (optionsData.length > 0) {
						actionApiListMerge(jobsTagListStoreName, {
							data: [ ...optionsData ],
							ready: true,
						})();
					}
				});
			});
		}
	}, [
		jobsTagListStoreName,
		jobsTagListApiUrl,
		optionListStoreName,
		optionListApiUrl,
		entityId,
		ready,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(jobsTagListStoreName)();
		actionApiFormPurge(optionListStoreName)();
	}, [
		jobsTagListStoreName,
		optionListStoreName,
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
					storeName={statusStoreName}
					apiUrl={statusApiUrl} />)}
				form={id}
				itemKey="name"
				name="tagStatusId"
				label="Status"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={jobsCategoryStoreName}
					apiUrl={jobsCategoryApiUrl} />)}
				form={id}
				itemKey="name"
				name="categoryId"
				label="Category"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsNotDelete}
				form={id}
				type="checkbox"
				name="isNotDelete" />
		</Box>
		{(utilsCheckStrIdExists(entityId) && fieldsBlock && ready) 
			&& <FormOptionValue entityId={entityId} storeName={jobsTagListStoreName} />}
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
		</Box>
		<DialogDrop redirect />
		<DialogDisable />
    </StyledWrapper>;
};

Tag = React.memo(Tag);
Tag.defaultProps = {
};
Tag.propTypes = {
};

export default Tag;
