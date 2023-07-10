import { LayoutLoaderService } from 'layout-loader';
import { LayoutFetchEntity } from './layout-fetch.entity.js';

export class LayoutFetchService extends LayoutLoaderService {
	constructor(repository) {
		super(repository ?? new LayoutFetchEntity());
	}
}
