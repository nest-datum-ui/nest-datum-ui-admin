import { LayoutController } from 'layout';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

export class LayoutLoaderController extends LayoutController {
	constructor(entityService = new LayoutLoaderService(new LayoutLoaderEntity())) {
		super(entityService);
	}
}
