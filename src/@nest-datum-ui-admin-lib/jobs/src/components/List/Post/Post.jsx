import React from 'react';
import TablePost from '../../Table/Post';
import StyledWrapper from './Styled/Wrapper.jsx';

let Post = (props) => {
	return <StyledWrapper>
		<TablePost />
	</StyledWrapper>;
};

Post = React.memo(Post);
Post.defaultProps = {
};
Post.propPosts = {
};

export default Post;
