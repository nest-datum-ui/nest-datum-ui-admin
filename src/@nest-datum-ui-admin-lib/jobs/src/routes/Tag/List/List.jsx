import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListTag from '../../../components/List/Tag';

let List = () => {
	return <ContextRoute.Provider value="jobsTagList">
		<PaperList>
			<ListTag />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
