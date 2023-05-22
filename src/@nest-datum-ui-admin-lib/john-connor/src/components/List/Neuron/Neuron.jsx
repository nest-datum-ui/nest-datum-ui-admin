import React from 'react';
import Xarrow from 'react-xarrows';
import { useSelector } from 'react-redux';
import {
	selectorMainExtract,
	actionApiListGet,
} from '@nest-datum-ui/Store';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import { arrFilled as utilsCheckArrFilled } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledItem from './Styled/Item.jsx';

let Neuron = () => {
	const neuronDataList = useSelector(selectorMainExtract([ 'api', 'list', 'neuronList', 'data' ]));
	const neuronDataListExists = (neuronDataList || []).length > 0;
	const neuronChainList = useSelector(selectorMainExtract([ 'api', 'list', 'chainList', 'data' ]));
	const areaWrapperRef = React.useRef();

	React.useEffect(() => {
		actionApiListGet('neuronList', {
			apiUrl: utilsFormatUrlApiStr(`${process.env.URL_API_JOHN_CONNOR}/neuron`),
			page: 1,
			limit: 9999,
		})();
	}, [
	]);

	React.useEffect(() => {
		if (neuronDataListExists) {
			actionApiListGet('chainList', {
				apiUrl: utilsFormatUrlApiStr(`${process.env.URL_API_JOHN_CONNOR}/chain`),
				page: 1,
				limit: 9999,
			})(() => {
				areaWrapperRef.current.style.height = `${areaWrapperRef.current.clientWidth}px`;
			});
		}
	}, [
		neuronDataListExists,
	]);

	return <StyledWrapper>
		<Box 
			ref={areaWrapperRef}
			className="area-wrapper">
			<Box className="area">
				{utilsCheckArrFilled(neuronDataList)
					&& neuronDataList.map((item) => <Tooltip 
						key={item.id}
						title={item.name}>
						<StyledItem 
							id={item.id} 
							sx={{ 
								left: `${item.x}px`, 
								top: `${item.y}px`, 
							}} />
					</Tooltip>)}
				{utilsCheckArrFilled(neuronChainList)
					&& neuronChainList.map((item) => <Xarrow
						key={item.id}
						start={String(item.parentId)}
						end={String(item.neuronId)}
						path="straight"
						lineColor={item.isFortified
							? '#2B2487'
							: 'green'}
						headColor={item.isFortified
							? '#2B2487'
							: 'green'}
						strokeWidth={2}
						headSize={4} />)}
			</Box>
		</Box>
	</StyledWrapper>;
};

Neuron = React.memo(Neuron);
Neuron.defaultProps = {
};
Neuron.propTypes = {
};

export default Neuron;
