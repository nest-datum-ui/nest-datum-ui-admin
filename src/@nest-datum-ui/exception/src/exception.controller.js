import { ReduxModelController } from '@nest-datum-ui/redux-model';
import { ExceptionService } from './exception.service.js';
import { ExceptionEntity } from './exception.entity.js';

export class ExceptionController extends ReduxModelController {
	constructor(entityService) {
		super(entityService ?? new ExceptionService(new ExceptionEntity()));
	}
}
