import { LayoutService } from 'layout';
import { MenuAsideEntity } from './menu-aside.entity.js';

export class MenuAsideService extends LayoutService {
	constructor(repository) {
		super(repository ?? new MenuAsideEntity());
	}
}
