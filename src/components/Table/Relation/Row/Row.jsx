import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import Typography from '@mui/material/Typography';
import TypographyTable from 'components/Typography/Table';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	isDeleted,
	createdAt,
	updatedAt,
	Component,
	children,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				columnName, 
				rowColumns, 
			}, 
		}, 
	} = React.useContext(ContextProps);

	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted}
		createdAt={createdAt}
		updatedAt={updatedAt}>
		{rowColumns
			.filter((item) => item['id'] && item['id'] !== 'story' && item['id'] !== 'createdAt')
			.map((item, index) => ({
				children: (item['id'] === 'id')
					? (utilsCheckFunc(item['wrapper'])
						? item['wrapper'](item, { ...props, id, createdAt, updatedAt, isDeleted })
						: <TypographyTable 
							key={index} 
							isDeleted={isDeleted}>
							{String(id)}
						</TypographyTable>)
					: ((item['id'] === columnName)
						? (Component
							? <Component 
								key={0} 
								id={id} 
								isDeleted={isDeleted} 
								{ ...props } />
							: (children
								? children
								: (utilsCheckFunc(item['wrapper'])
									? item['wrapper'](item, { ...props, id, createdAt, updatedAt, isDeleted })
									: <Typography key={1} component="div">
										{String(props[columnName] ?? '')}
									</Typography>)))
						: (utilsCheckFunc(item['wrapper'])
							? item['wrapper'](item, { ...props, id, createdAt, updatedAt, isDeleted })
							: <Typography key={1} component="div">
								{String(props[item['id']] ?? '')}
							</Typography>)),
			}))}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

export default Row;
