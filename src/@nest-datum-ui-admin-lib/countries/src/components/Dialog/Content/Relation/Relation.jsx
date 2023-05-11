import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import FormRegionRelation from '../../../Form/Region/Relation';

let Relation = ({ id, ...props }) => {
	const regionContentId = useSelector(selectorMainExtract([ 'dialog', id, 'regionContentId' ]));

	return <Dialog { ...props } id={id}>
		<FormRegionRelation regionContentId={regionContentId} />
	</Dialog>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	id: 'relation',
	title: 'Set value',
	subtitle: 'Specify a value for a particular region field.',
	onSubmit: () => {},
};
Relation.propTypes = {
	onSubmit: PropTypes.func,
};

export default Relation;