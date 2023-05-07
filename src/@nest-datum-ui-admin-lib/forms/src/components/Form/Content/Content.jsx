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
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import ListRelation from 'components/List/Relation';
import Select from 'components/Select';
import InputId from 'components/Input/Id';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import DialogDropForce from 'components/Dialog/Drop/Force';
import DialogContentRelation from '../../Dialog/Content/Relation';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Content = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				statusListName,
				relationListName,
				id, 
				storeName, 
				apiFullUrl: apiUrl,  
			},
			formsFormList: {
				storeName: formsFormListStoreName, 
				apiFullUrl: formsFormListApiUrl,
			},
			formsFieldList: {
				apiFullUrl: relationApiUrl,
			},
		},
		sso: {
			ssoUserList: {
				storeName: ssoUserListStoreName, 
				apiFullUrl: ssoUserListApiUrl,
			},
		}
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[statusListName]: { 
				storeName: statusStoreName, 
				apiFullUrl: statusApiUrl,
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isDeleted' ]));
	const onSubmitWrapper = React.useCallback((e) => handlerSubmit(e, storeName, apiUrl, entityId), [
		storeName,
		apiUrl,
		entityId,
	]);
	const onDrop = React.useCallback(() => actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId })(), [
		entityId,
		isDeleted,
	]);
	const onRestore = React.useCallback(() => actionApiFormRestore(storeName, { apiUrl: apiUrl, entityId }), [
		storeName,
		apiUrl,
		entityId,
	]);
	const initialFilter = React.useMemo(() => ({ contentId: entityId }), [
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
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={formsFormListStoreName}
					apiUrl={formsFormListApiUrl} />)}
				form={id}
				itemKey="name"
				name="formId"
				label="Form"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={ssoUserListStoreName}
					apiUrl={ssoUserListApiUrl} />)}
				form={id}
				itemKey="login"
				name="userId"
				label="User"
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
				name="contentStatusId"
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
		<Box pb={2}>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
						Save
					</ButtonPrimary>
				</Grid>
				{!isNotDelete && isDeleted
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary startIcon={<SettingsBackupRestoreIcon />} onClick={onRestore}>
							Restore
						</ButtonPrimary>
					</Grid>}
				{!isNotDelete && utilsCheckStrId(entityId)
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
				&& <ContextRoute.Provider value={relationListName}>
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
							fieldId, 
							isDeleted, 
						}) => <TypographyFetch 
							key={id ?? fieldId} 
							apiUrl={relationApiUrl}>
								{fieldId}
							</TypographyFetch>} />
				</ContextRoute.Provider>}
		</Box>
		<DialogDrop redirect />
		<DialogDisable />
    </StyledWrapper>;
};

Content = React.memo(Content);
Content.defaultProps = {
};
Content.propTypes = {
};

export default Content;
