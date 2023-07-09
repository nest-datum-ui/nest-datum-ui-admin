import { LayoutController } from 'layout';
import { LayoutAppService } from './layout-app.service.js';
import { LayoutAppEntity } from './layout-app.entity.js';

export class LayoutAppController extends LayoutController {
	constructor(entityService) {
		super(entityService ?? new LayoutAppService(new LayoutAppEntity()));
	}
}
