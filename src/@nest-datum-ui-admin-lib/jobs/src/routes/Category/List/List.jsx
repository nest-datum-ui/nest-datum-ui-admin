import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListCategory from '../../../components/List/Category';

let List = () => {
	return <ContextRoute.Provider value="jobsCategoryList">
		<PaperList>
			<ListCategory />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
