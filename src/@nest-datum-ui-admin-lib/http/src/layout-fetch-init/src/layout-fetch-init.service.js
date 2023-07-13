import { LayoutFetchService } from '../../layout-fetch';
import { LayoutFetchInitEntity } from './layout-fetch-init.entity.js';

export class LayoutFetchInitService extends LayoutFetchService {
	constructor(repository) {
		super(repository ?? new LayoutFetchInitEntity());
	}
}
