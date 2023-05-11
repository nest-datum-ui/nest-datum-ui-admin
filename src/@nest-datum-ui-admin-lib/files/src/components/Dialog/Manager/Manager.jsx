import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextService,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Dialog from '@nest-datum-ui/Dialog';
import ListManager from '../../../components/List/Manager';

let Manager = ({ 
	id, 
	allowSelectSystem,
	systemInitialFilter,
	systemId,
	parentId,
	onCheck,
	onFolder,
	onFile, 
	...props 
}) => {
	return <Dialog maxWidth="lg" { ...props } id={id}>
		<ContextService.Provider value="files">
			<ContextRoute.Provider value="filesManagerList">
				<ListManager 
					withFilter={false}
					withContextMenu={false} 
					bulkDeletion={false}
					querySource="store"
					allowSelectSystem={allowSelectSystem}
					systemInitialFilter={systemInitialFilter}
					systemId={systemId}
					parentId={parentId}
					onCheck={onCheck}
					onFolder={onFolder}
					onFile={onFile} />
			</ContextRoute.Provider>
		</ContextService.Provider>
	</Dialog>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	title: 'Select file',
	id: 'filesManager',
	onSubmit: () => {},
	onCheck: () => {},
};
Manager.propTypes = {
	onSubmit: PropTypes.func,
	onCheck: PropTypes.func,
};

export default Manager;