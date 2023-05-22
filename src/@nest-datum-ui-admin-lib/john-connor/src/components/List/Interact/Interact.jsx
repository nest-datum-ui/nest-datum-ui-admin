import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormInteract from '../../Form/Interact';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledList from './Styled/List.jsx';
import StyledManager from './Styled/Manager.jsx';

let Interact = () => {
	const [ isCorrect, setIsCorrect ] = React.useState(() => false);
	const [ state, setState ] = React.useState(() => ([{
		readChain: [ 1 ],
		executeChain: [ 2 ],
		stateId: 1,
		value: '',
	}]));
	const currentStateId = state[state.length - 1]['stateId'];
	const currentValue = state[state.length - 1]['value'];
	const onYes = React.useCallback(async () => {
		const request = await axios(utilsFormatUrlApiStr(`${process.env.URL_API_JOHN_CONNOR}/neuron/step?id=${currentStateId}&value=${currentValue}`));

		if (((request || {}).data || {}).stateId > 0) {
			setState((data) => ([
				...data,
				{
					executeChain: request.data.executeChain,
					readChain: request.data.readChain,
					stateId: request.data.stateId,
					value: request.data.value,
				},
			]));
		}
	}, [
		currentStateId,
		currentValue,
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
					<b>readChain:</b> {item.readChain.join('-')}
				</Typography>
				<Typography
					component="div"
					variant="body2">
					<b>executeChain:</b> {item.executeChain.join('-')}
				</Typography>
				<Typography
					component="div"
					variant="body2">
					<b>stateId:</b> {item.stateId}
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
