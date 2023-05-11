import React from 'react';
import PropTypes from 'prop-types';
import { 
	actionDialogOpen,
	actionDialogClose, 
} from '@nest-datum-ui/Store';
import { 
	obj as utilsCheckObj,
	objFilled as utilsCheckObjFilled,
	strUrl as utilsCheckStrUrl,
	strIdExists as utilsCheckStrIdExists, 
	exists as utilsCheckExists,
} from '@nest-datum-utils/check';
import TypographyHelperText from '@nest-datum-ui/Typography/HelperText';
import ButtonLabel from 'components/Button/Label';
import FilesDialogManager from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Manager';
import FilesPaperPreview from '../../Paper/Preview';

let Manager = ({ 
	systemInitialFilter,
	allowSelectSystem,
	systemId,
	parentId,
	children,
	storeName, 
	lebel,
	helperText,
	error,
	accept, 
	value,
	defaultValue,
	onChange,
	onOpen,
	onFile,
	...props 
}) => {
	const [ valueState, setValueState ] = React.useState(() => value ?? defaultValue);
	const onOpenWrapper = React.useCallback((e) => {
		actionDialogOpen('filesManager')();
		onOpen(e);
	}, [
		onOpen,
	]);
	const onFileWrapper = React.useCallback((e, item) => {
		if (utilsCheckStrIdExists(item['id'])) {
			e.target.value = item['id'];

			setValueState(item['id']);
			onFile(e, item);
			onChange(e);
			actionDialogClose('filesManager')();
		}
	}, [
		setValueState,
		onFile,
		onChange,
	]);

	return <React.Fragment>
		{lebel
			&& <ButtonLabel onClick={onOpenWrapper}>
				{lebel}
			</ButtonLabel>}
		{(utilsCheckExists(valueState) && valueState)
			&& <React.Fragment>
				<input { ...props } type="hidden" value={(utilsCheckStrUrl(valueState)
					? valueState
					: valueState)} />
				{(utilsCheckObj(valueState)
					? (utilsCheckObjFilled(valueState)
						? <FilesPaperPreview value={valueState} />
						: <React.Fragment />)
					: (<FilesPaperPreview value={utilsCheckStrUrl(valueState)
						? { src: valueState }
						: { id: valueState }} />))}
			</React.Fragment>}
		<TypographyHelperText
			error={error}
			helperText={helperText} />
		<FilesDialogManager
			onFile={onFileWrapper}
			allowSelectSystem={allowSelectSystem}
			systemInitialFilter={systemInitialFilter}
			systemId={systemId}
			parentId={parentId} />
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	lebel: 'Select file',
	type: 'object',
	accept: '*',
	onChange: (() => {}),
	onOpen: (() => {}),
	onFile: (() => {}),
	parentId: '',
	allowSelectSystem: false,
};
Manager.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	onOpen: PropTypes.func,
	onFile: PropTypes.func,
	allowSelectSystem: PropTypes.bool,
	systemId: PropTypes.string,
	parentId: PropTypes.string,
};

export default Manager;
