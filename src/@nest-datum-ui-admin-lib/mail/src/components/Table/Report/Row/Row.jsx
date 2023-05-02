import React from 'react';
import { ContextProps } from '@nest-datum-ui/Context';
import { strToObj as utilsFormatStrToObj } from '@nest-datum-utils/format';
import { 
	objFilled as utilsCheckObjFilled,
	strFilled as utilsCheckStrFilled, 
} from '@nest-datum-utils/check';
import Typography from '@mui/material/Typography';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	action,
	content,
	reportStatusId,
	userId,
	createdAt,
	updatedAt,
}) => {
	const { 
		mail: {
			mailReportStatusList: {
				apiFullUrl: mailReportStatusListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const contentProcessed = utilsFormatStrToObj(content);

	return <StyledWrapper 
		id={id}
		createdAt={createdAt} 
		updatedAt={updatedAt}>
		{([{ 
			children: <TypographyTable key={0}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable variant="h6">
					{action}
				</TypographyTable>
				<div />
				<TypographyTable variant="subtitle1">
					{utilsCheckObjFilled(contentProcessed)
						? Object
							.keys(contentProcessed)
							.filter((key) => key !== 'password'
								&& key !== 'repeatedPassword'
								&& key !== 'emailVerifyKey')
							.map((key) => utilsCheckStrFilled(contentProcessed[key])
								? <Typography
									key={key}
									component="div"
									variant="caption">
									<b>{key}</b>: ${contentProcessed[key]}
								</Typography>
								: <React.Fragment key={key} />)
						: String(content)}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch 
				key={2} 
				apiUrl={mailReportStatusListApiUrl}>
				{reportStatusId}
			</TypographyFetch>, 
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
};

export default Row;
