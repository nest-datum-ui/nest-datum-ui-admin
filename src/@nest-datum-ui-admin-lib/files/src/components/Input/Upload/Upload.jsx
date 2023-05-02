import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { obj as utilsCheckObj } from '@nest-datum-utils/check';
import FilesPaperPreview from '../../Paper/Preview';
import StyledWrapper from './Styled/Wrapper.jsx';

let Upload = ({ 
	disablePreview,
	multiple,
	storeName, 
	name, 
	id, 
	label, 
	children, 
	form, 
	accept, 
	value,
	defaultValue,
	onChange, 
	...props 
}) => {
	const previewRef = React.useRef();
	const [ savedId ] = React.useState(() => id || uuidv4());
	const [ preview, setPreview ] = React.useState(() => value ?? defaultValue);
	const onChangeWrapper = React.useCallback((e) => {
		const reader = new FileReader();
		const files = e.target.files;

		reader.readAsDataURL(e.target.files[0]);
		reader.addEventListener('load', (e) => {
			setPreview((currentState) => {
				const newState = {
					...currentState,
					src: e.target.result,
					name: files[0].name,
					size: files[0].size,
				};

				((previewRef.current || {}).style || {})['backgroundImage'] = `url(${e.target.result})`;

				return newState;
			});
		});
		onChange(e);
	}, [
		onChange,
		setPreview,
		previewRef,
	]);

	return <React.Fragment>
		<StyledWrapper { ...props } component="label" htmlFor={savedId}>
			<input 
				type="file" 
				name={name} 
				id={savedId} 
				form={form} 
				accept={accept}
				multiple={multiple}
				onChange={onChangeWrapper} />
			{label || children}
		</StyledWrapper>
		{(!disablePreview && preview)
			&& <FilesPaperPreview 
				wrapperRef={previewRef}
				src={utilsCheckObj(preview)
					? preview['src']
					: preview} />}
	</React.Fragment>;
};

Upload = React.memo(Upload);
Upload.defaultProps = {
	disablePreview: false,
	multiple: false,
	type: 'object',
	name: 'file',
	accept: '*',
	onChange: (() => {}),
};
Upload.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	multiple: PropTypes.bool,
};

export default Upload;
