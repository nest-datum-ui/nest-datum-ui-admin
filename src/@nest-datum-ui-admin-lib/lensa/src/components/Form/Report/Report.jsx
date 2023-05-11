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
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Field from '@nest-datum-ui/Field';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import InputText from '@nest-datum-ui/Input/Text';
import InputEmail from '@nest-datum-ui/Input/Email';
import InputId from 'components/Input/Id';
import InputName from 'components/Input/Name';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Report = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				id, 
				storeName, 
				apiFullUrl: apiUrl,  
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
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
				Component={InputId}
				form={id}
				name="lensaId"
				label="Lensa id"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputId}
				form={id}
				name="targetId"
				label="Target id"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="source"
				label="Source"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="candidateSource"
				label="Candidate source"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="customerCategory"
				label="Customer category"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="language"
				label="Language"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="jobTitle"
				label="Job title"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputName}
				form={id}
				name="firstName"
				label="First name"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputEmail}
				form={id}
				name="email"
				label="Email"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="state"
				label="State"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputText}
				form={id}
				name="city"
				label="City"
				required />
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
				{isDeleted
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary startIcon={<SettingsBackupRestoreIcon />} onClick={onRestore}>
							Restore
						</ButtonPrimary>
					</Grid>}
				{utilsCheckStrId(entityId)
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

Report = React.memo(Report);
Report.defaultProps = {
};
Report.propTypes = {
};

export default Report;
