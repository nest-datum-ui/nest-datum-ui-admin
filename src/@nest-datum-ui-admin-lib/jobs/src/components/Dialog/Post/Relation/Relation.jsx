import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import FormPostRelation from '../../../Form/Post/Relation';

let Relation = ({ id, ...props }) => {
	const postContentId = useSelector(selectorMainExtract([ 'dialog', id, 'postContentId' ]));

	return <Dialog { ...props } id={id}>
		<FormPostRelation postContentId={postContentId} />
	</Dialog>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	id: 'relation',
	title: 'Set value',
	subtitle: 'Specify a value for a particular field.',
	onSubmit: () => {},
};
Relation.propTypes = {
	onSubmit: PropTypes.func,
};

export default Relation;