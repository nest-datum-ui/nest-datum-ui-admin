import React from 'react';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Typography from '@mui/material/Typography';
import TypographyTable from 'components/Typography/Table';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	lensaId,
	targetId,
	source,
	candidateSource,
	customerCategory,
	fileId,
	language,
	jobTitle,
	firstName,
	email,
	state,
	city,
	isDeleted,
	createdAt,
	updatedAt,
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				parentName,
			}, 
		},
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[parentName]: { 
				pageFullUrl, 
			}, 
		}, 
	} = React.useContext(ContextProps);

	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted} 
		createdAt={createdAt} 
		updatedAt={updatedAt}>
		{([{ 
			children: <TypographyTable 
				key={0} 
				to={`${pageFullUrl}/${id}`} 
				isDeleted={isDeleted}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <Typography 
				key={1} 
				component="div">
				<div>{lensaId}</div>
				<div>{targetId}</div>
			</Typography>, 
		}, { 
			children: <Typography 
				key={2} 
				component="div">
				<div>{source}</div>
				<div>{candidateSource}</div>
			</Typography>,
		}, { 
			children: <Typography 
				key={3} 
				component="div">
				<div>{customerCategory}</div>
				<div>{jobTitle}</div>
			</Typography>,
		}, { 
			children: <Typography 
				key={4} 
				component="div">
				<div>{firstName}</div>
				<div>{email}</div>
				<div>{state}</div>
				<div>{city}</div>
			</Typography>,
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
};

export default Row;
