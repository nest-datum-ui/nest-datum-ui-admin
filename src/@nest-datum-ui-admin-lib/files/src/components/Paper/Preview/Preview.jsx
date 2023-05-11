import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContextProps } from '@nest-datum-ui/Context';
import {
	selectorMainExtract,
	actionApiFormGet,
	actionApiFormPurge,
} from '@nest-datum-ui/Store';
import {
	strImage as utilsCheckStrImage,
	strPdf as utilsCheckStrPdf,
	strEjs as utilsCheckStrEjs,
} from '@nest-datum-utils/check';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import StyledWrapper from './Styled/Wrapper.jsx';

let Preview = ({ value, isDeleted, ...props }) => {
	const { 
		files: { 
			filesManagerList: { 
				files: {
					apiFullUrl: apiUrl,
				},
			},
		}, 
	} = React.useContext(ContextProps);
	const id = value['id'];
	const path = useSelector(selectorMainExtract([ 'api', 'form', id, 'path' ]));
	const src = path && (utilsFormatUrlApiStr(process.env.URL_API_FILES + path));
	const isImage = React.useMemo(() => utilsCheckStrImage(src ?? value['src']), [
		value,
		src,
	]);
	const isPdf = React.useMemo(() => utilsCheckStrPdf(src ?? value['src']), [
		value,
		src,
	]);
	const isEjs = React.useMemo(() => utilsCheckStrEjs(src ?? value['src']), [
		value,
		src,
	]);

	React.useEffect(() => {
		actionApiFormGet(id, { apiUrl, entityId: id })()
	}, [
		id,
		apiUrl,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(id)();
	}, [
		id,
	]);
	console.log("isImage",src)
	console.log("isImage",value['src'])
	console.log("isImage",path)
	console.log("isImage",isImage)
	return <StyledWrapper url={src ?? value['src']} isimage={Number(isImage)}>
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
				case isImage:
					return <span
						style={{
							width: '100px',
							height: '70px',
							paddingRight: '15px'
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
