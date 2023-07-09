import { LayoutService } from 'layout';
import { LayoutLoaderEntity } from './layout-loader.entity.js';

export class LayoutLoaderService extends LayoutService {
	constructor(repository) {
		super(repository ?? new LayoutLoaderEntity());
	}
}
