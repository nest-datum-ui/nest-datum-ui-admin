import { LayoutLoaderController } from 'layout-loader';
import { LayoutFetchService } from './layout-fetch.service.js';
import { LayoutFetchEntity } from './layout-fetch.entity.js';

export class LayoutFetchController extends LayoutLoaderController {
	constructor(entityService) {
		super(entityService ?? new LayoutFetchService(new LayoutFetchEntity()));
	}
}
