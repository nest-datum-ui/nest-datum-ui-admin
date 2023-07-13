import { ReduxReducerModelController } from '@nest-datum-ui/redux-reducer-model';
import { ExceptionService } from './exception.service.js';
import { ExceptionEntity } from './exception.entity.js';

export class ExceptionController extends ReduxReducerModelController {
	constructor(entityService) {
		super(entityService ?? new ExceptionService(new ExceptionEntity()));
	}
}
