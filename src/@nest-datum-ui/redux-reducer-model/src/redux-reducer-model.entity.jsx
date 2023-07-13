import { ReduxReducerEntity } from '@nest-datum-ui/redux-reducer';

export class ReduxReducerModelEntity extends ReduxReducerEntity {
	setData(path = [], value) {
		return this.dispatch({ 
			instance: () => this,
			type: 'update', 
			path, 
			value,
		});
	}

	async save(payloadData = {}) {
		return this.setData([ this.id ], { ...this.columnsForSave(await super.save(payloadData)) });
	}
}
