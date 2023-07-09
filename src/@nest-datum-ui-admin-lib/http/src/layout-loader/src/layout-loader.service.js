import { LayoutLoaderService as DefaultLayoutLoaderService } from 'layout-loader';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

export class LayoutLoaderService extends DefaultLayoutLoaderService {
	constructor(repository) {
		super(repository ?? new LayoutLoaderEntity());
	}
}
