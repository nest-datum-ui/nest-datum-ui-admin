import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperList from 'components/Paper/List';
import ListPost from '../../../components/List/Post';

let List = () => {
	return <ContextRoute.Provider value="dictionaryPostList">
		<PaperList>
			<ListPost />
		</PaperList>
	</ContextRoute.Provider>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
