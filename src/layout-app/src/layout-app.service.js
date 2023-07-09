import { LayoutService } from 'layout';
import { LayoutAppEntity } from './layout-app.entity.js';

export class LayoutAppService extends LayoutService {
	constructor(repository) {
		super(repository ?? new LayoutAppEntity());
	}
}
