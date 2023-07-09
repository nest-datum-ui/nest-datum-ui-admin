import { LayoutLoaderService } from 'layout-loader';
import { LayoutAuthedEntity } from './layout-authed.entity.js';

export class LayoutAuthedService extends LayoutLoaderService {
	constructor(repository) {
		super(repository ?? new LayoutAuthedEntity());
	}
}
