import { LayoutLoaderController as DefaultLayoutLoaderController } from 'layout-loader';
import { LayoutLoaderService } from './layout-loader.service.js';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

export class LayoutLoaderController extends DefaultLayoutLoaderController {
	constructor(entityService) {
		super(entityService ?? new LayoutLoaderService(new LayoutLoaderEntity()));
	}
}
