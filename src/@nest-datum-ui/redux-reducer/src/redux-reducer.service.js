import {
	objFilled as utilsCheckObjFilled,
	arrFilled as utilsCheckArrFilled,
} from '@nest-datum-utils/check';
import { ReduxService } from '@nest-datum-ui/redux';
import { ReduxReducerEntity } from './redux-reducer.entity.jsx';

export class ReduxReducerService extends ReduxService {
	constructor(repository) {
		super(repository ?? new ReduxReducerEntity());

		(async () => await this.provideReduxStore(repository))();
	}

	async provideReduxStore(repository) {
		return new Promise((resolve, reject) => setTimeout(async () => {
			const reduxStoresList = await repository.find({ 
				select: {
					store: true,
				}, 
				where: { 
					name: 'ReduxEntity',
				}, 
			});

			if (utilsCheckArrFilled(reduxStoresList) 
				&& utilsCheckObjFilled(reduxStoresList[0])
				&& reduxStoresList[0].store) {
				repository['store'] = reduxStoresList[0].store;
				repository['store']['reducers'] = reduxStoresList[0].store.reducers;
				resolve(repository);
			}
			else {
				await this.provideReduxStore(repository);
			}
		}, 0));
	}
}
