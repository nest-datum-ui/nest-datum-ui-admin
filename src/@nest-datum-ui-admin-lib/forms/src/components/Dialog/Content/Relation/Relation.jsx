import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import FormContentRelation from '../../../Form/Content/Relation';

let Relation = ({ id, ...props }) => {
	const fieldContentId = useSelector(selectorMainExtract([ 'dialog', id, 'fieldContentId' ]));

	return <Dialog { ...props } id={id}>
		<FormContentRelation fieldContentId={fieldContentId} />
	</Dialog>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	id: 'relation',
	title: 'Set value',
	subtitle: 'Specify a value for a particular form field.',
	onSubmit: () => {},
};
Relation.propTypes = {
	onSubmit: PropTypes.func,
};

export default Relation;