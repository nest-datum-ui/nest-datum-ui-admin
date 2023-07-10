import { LayoutController } from 'layout';
import { MenuAsideService } from './menu-aside.service.js';
import { MenuAsideEntity } from './menu-aside.entity.js';

export class MenuAsideController extends LayoutController {
	constructor(entityService) {
		super(entityService ?? new MenuAsideService(new MenuAsideEntity()));
	}
}
