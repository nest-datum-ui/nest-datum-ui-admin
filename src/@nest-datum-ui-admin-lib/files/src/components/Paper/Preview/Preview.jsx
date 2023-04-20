import React from 'react';
import PropTypes from 'prop-types';
import {
	strImage as utilsCheckStrImage,
	strPdf as utilsCheckStrPdf,
	strEjs as utilsCheckStrEjs,
} from '@nest-datum-utils/check';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import StyledWrapper from './Styled/Wrapper.jsx';

let Preview = ({ value, isDeleted, ...props }) => {
	const isImage = React.useMemo(() => utilsCheckStrImage(value['src']), [
		value,
	]);
	const isPdf = React.useMemo(() => utilsCheckStrPdf(value['src']), [
		value,
	]);
	const isEjs = React.useMemo(() => utilsCheckStrEjs(value['src']), [
		value,
	]);

	return <StyledWrapper url={value['src']} isimage={Number(isImage)}>
		{(() => {
			switch (true) {
				case isPdf:
					return <PictureAsPdfIcon
						style={{
							width: '100%',
							height: '100%',
						}}
						color={isDeleted
							? 'disabled'
							: 'primary'} />;
				case isEjs:
					return <ViewQuiltIcon
						style={{
							width: '100%',
							height: '100%',
						}}
						color={isDeleted
							? 'disabled'
							: 'primary'} />;
				case (!isImage && !isEjs && !isPdf):
					return <InsertDriveFileIcon
						style={{
							width: '100%',
							height: '100%',
						}}
						color={isDeleted
							? 'disabled'
							: 'primary'} />;
				default:
					return <React.Fragment />;
			}
		})()}
	</StyledWrapper>;
};

Preview = React.memo(Preview);
Preview.defaultProps = {
	value: {},
};
Preview.propTypes = {
	value: PropTypes.object,
};

export default Preview;
