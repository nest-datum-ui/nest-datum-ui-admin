import { ReduxReducerModelService } from '@nest-datum-ui/redux-reducer-model';
import { ExceptionEntity } from './exception.entity.js';

export class ExceptionService extends ReduxReducerModelService {
	constructor(repository) {
		super(repository ?? new ExceptionEntity());
	}
}
