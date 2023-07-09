import { LayoutLoaderController } from 'layout-loader';
import { LayoutAuthedService } from './layout-authed.service.js';
import { LayoutAuthedEntity } from './layout-authed.entity.js';

export class LayoutAuthedController extends LayoutLoaderController {
	constructor(entityService) {
		super(entityService ?? new LayoutAuthedService(new LayoutAuthedEntity()));
	}
}
