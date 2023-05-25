import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import { arrFilled as utilsCheckArrFilled } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormInteract from '../../Form/Interact';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledList from './Styled/List.jsx';
import StyledManager from './Styled/Manager.jsx';

let Interact = ({ onUpdate }) => {
	const [ isCorrect, setIsCorrect ] = React.useState(() => false);
	const [ state, setState ] = React.useState(() => ([{
		chain: [ 1 ],
		value: 'pwd',
	}]));
	const currentState = state[state.length - 1];
	const currentId = currentState['chain'][currentState['chain'].length - 1];
	const currentValue = currentState['value'];
	const onYes = React.useCallback(async () => {
		const request = await axios.post(utilsFormatUrlApiStr(`${process.env.URL_API_JOHN_CONNOR}/neuron/step`), {
			id: currentId,
			value: currentValue,
		});

		if (utilsCheckArrFilled(((request || {}).data || {}).chain)) {
			setState((data) => {
				const newState = [
					...data,
					{
						chain: request.data.chain,
						value: request.data.value,
					},
				];

				setTimeout(() => onUpdate(newState), 0);

				return newState;
			});
		}
	}, [
		currentValue,
		currentId,
		onUpdate,
	]);
	const onNo = React.useCallback(() => setIsCorrect(true), [
		setIsCorrect,
	]);

	return <StyledWrapper>
		<StyledList>
			{state.map((item) => <Box
				key={uuidv4()}
				pb={2}>
				<Typography
					component="div"
					variant="body2">
					<b>chain:</b> {item.chain.join('-')}
				</Typography>
				<Typography
					component="div"
					variant="body2">
					<b>value:</b> {String(item.value ?? '')}
				</Typography>
			</Box>)}
		</StyledList>
		<StyledManager>
			{isCorrect
				? <Box
					sx={{
						position: 'relative',
						display: 'block',
						width: '100%',
						height: '100%',
					}}>
					<FormInteract 
						setState={setState}
						setIsCorrect={setIsCorrect} />
				</Box>
				: <React.Fragment>
					<Button
						disableElevation
						variant="contained"
						color="secondary"
						onClick={onYes}>
						YES
					</Button>
					<Button
						disableElevation
						variant="contained"
						color="error"
						onClick={onNo}>
						NO
					</Button>
				</React.Fragment>}
		</StyledManager>
	</StyledWrapper>;
};

Interact = React.memo(Interact);
Interact.defaultProps = {
};
Interact.propTypes = {
};

export default Interact;
