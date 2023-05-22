import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Field from '@nest-datum-ui/Field';
import InputText from '@nest-datum-ui/Input/Text';
import StyledWrapper from './Styled/Wrapper.jsx';

let Interact = ({ 
	setState,
	setIsCorrect, 
}) => {
	const onSubmit = React.useCallback((e) => setState((data) => {
		data[data.length - 1]['value'] = e.target.elements['value']['value'];
		setIsCorrect(false);

		return [ ...data ];
	}), [
		setState,
		setIsCorrect,
	]);
	const onCancel = React.useCallback(() => setIsCorrect(false), [
		setIsCorrect,
	]);

	return <StyledWrapper
		storeName="interact" 
		id="interact"
		onSubmit={onSubmit}>
		<Box>
			<Field
				Component={InputText}
				form="interact"
				name="value"
				rows={3}
				multiline />
		</Box>
		<Grid 
			container 
			spacing={2} 
			justifyContent="space-between">
			<Grid
				item
				xs={false}>
				<Button 
					disableElevation
					variant="contained"
					color="error"
					size="small"
					onClick={onCancel}>
					Cancel
				</Button>
			</Grid>
			<Grid
				item
				xs={false}>
				<Button 
					disableElevation
					variant="contained"
					color="secondary"
					size="small"
					form="interact" 
					type="submit">
					OK
				</Button>
			</Grid>
		</Grid>
	</StyledWrapper>;
};

Interact = React.memo(Interact);
Interact.defaultProps = {
};
Interact.propTypes = {
};

export default Interact;
