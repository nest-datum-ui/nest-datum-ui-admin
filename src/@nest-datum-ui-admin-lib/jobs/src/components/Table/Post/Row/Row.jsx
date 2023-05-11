import React from 'react';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	name,
	description,
	categoryId,
	postStatusId,
	isDeleted,
	isNotDelete,
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
		jobs: {
			jobsPostStatusList: {
				apiFullUrl: jobsPostStatusListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageFullUrl } } } = React.useContext(ContextProps);

	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted} 
		isNotDelete={isNotDelete} 
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
			children: <React.Fragment key={1}>
				<TypographyTable 
					to={`${pageFullUrl}/${id}`} 
					isDeleted={isDeleted} 
					variant="h6">
					{name}
				</TypographyTable>
				<div />
				<TypographyTable 
					to={`${pageFullUrl}/${id}`} 
					isDeleted={isDeleted} 
					variant="subtitle1">
					{description}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch 
				key={2} 
				apiUrl={jobsPostStatusListApiUrl} 
				label="name">
				{postStatusId}
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
