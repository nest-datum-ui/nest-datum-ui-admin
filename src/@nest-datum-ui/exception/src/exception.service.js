import { ReduxModelService } from '@nest-datum-ui/redux-model';
import { ExceptionEntity } from './exception.entity.js';

export class ExceptionService extends ReduxModelService {
	constructor(repository) {
		super(repository ?? new ExceptionEntity());
	}
}
