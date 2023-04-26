import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListType from '../../../components/List/Type';

let List = () => {
	return <ContextRoute.Provider value="countriesTypeList">
		<PaperList>
			<ListType />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
