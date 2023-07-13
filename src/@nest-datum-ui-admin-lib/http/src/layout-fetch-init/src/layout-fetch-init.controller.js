import { LayoutFetchController } from '../../layout-fetch';
import { LayoutFetchInitService } from './layout-fetch-init.service.js';
import { LayoutFetchInitEntity } from './layout-fetch-init.entity.js';

export class LayoutFetchInitController extends LayoutFetchController {
	constructor(entityService) {
		super(entityService ?? new LayoutFetchInitService(new LayoutFetchInitEntity()));
	}
}
