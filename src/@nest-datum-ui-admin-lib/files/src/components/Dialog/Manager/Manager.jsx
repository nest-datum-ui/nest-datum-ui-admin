import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import ListManager from '../../../components/List/Manager';

let Manager = ({ id, ...props }) => {
	const systemId = useSelector(selectorMainExtract([ 'dialog', id, 'systemId' ]));
	const parentId = useSelector(selectorMainExtract([ 'dialog', id, 'parentId' ]));
	const setValueState = useSelector(selectorMainExtract([ 'dialog', id, 'setValueState' ]));
	const onClose = useSelector(selectorMainExtract([ 'dialog', id, 'onClose' ]));
	const onCheck = React.useCallback((e, item) => {
		console.log('e, item', e, item);
	}, [
	]);

	return <Dialog maxWidth="md" { ...props } id={id}>
		<ContextService.Provider value="files">
			<ContextRoute.Provider value="filesManagerList">
				<ListManager 
					withFilter={false} 
					querySource="store"
					onCheck={onCheck} />
			</ContextRoute.Provider>
		</ContextService.Provider>
	</Dialog>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	title: 'Select file',
	id: 'filesManager',
	onSubmit: () => {},
};
Manager.propTypes = {
	onSubmit: PropTypes.func,
};

export default Manager;