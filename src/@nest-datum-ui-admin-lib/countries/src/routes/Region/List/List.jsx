import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListRegion from '../../../components/List/Region';

let List = () => {
	return <ContextRoute.Provider value="countriesRegionList">
		<PaperList>
			<ListRegion />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
