import React from 'react';
import PropTypes from 'prop-types';
import { actionDialogOpen } from '@nest-datum-ui/Store';
import { 
	obj as utilsCheckObj,
	strUrl as utilsCheckStrUrl, 
	exists as utilsCheckExists,
} from '@nest-datum-utils/check';
import TypographyHelperText from '@nest-datum-ui/Typography/HelperText';
import ButtonLabel from 'components/Button/Label';
import FilesDialogManager from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Manager';
import FilesPaperPreview from '../../Paper/Preview';

let Manager = ({ 
	systemId,
	parentId,
	select,
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
	onClose,
	...props 
}) => {
	const [ valueState, setValueState ] = React.useState(() => value ?? defaultValue);
	const onOpenWrapper = React.useCallback((e) => {
		actionDialogOpen('filesManager', { setValueState, onClose, systemId, parentId })();
		onOpen(e);
	}, [
		setValueState,
		onOpen,
		onClose,
		systemId,
		parentId,
	]);
	const onChangeWrapper = React.useCallback((e) => {
		setValueState(e.target.value);
		onChange(e);
	}, [
		setValueState,
		onChange,
	]);

	return <React.Fragment>
		{lebel
			&& <ButtonLabel onClick={onOpenWrapper}>
				{lebel}
			</ButtonLabel>}
		<input { ...props } type="hidden" onChange={onChangeWrapper} />
		{utilsCheckExists(valueState)
			&& (utilsCheckObj(valueState)
				? <FilesPaperPreview value={valueState} />
				: (<FilesPaperPreview value={utilsCheckStrUrl(valueState)
					? { src: valueState }
					: { id: valueState }} />))}
		<TypographyHelperText
			error={error}
			helperText={helperText} />
		<FilesDialogManager />
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	lebel: 'Select file',
	type: 'object',
	accept: '*',
	onChange: (() => {}),
	onOpen: (() => {}),
	systemId: 'files-system-default',
	parentId: '',
};
Manager.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	onOpen: PropTypes.func,
};

export default Manager;
