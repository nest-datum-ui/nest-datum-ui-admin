import { LayoutController } from 'layout';
import { ButtonDashboardService } from './button-dashboard.service.js';
import { ButtonDashboardEntity } from './button-dashboard.entity.js';

export class ButtonDashboardController extends LayoutController {
	constructor(entityService) {
		super(entityService ?? new ButtonDashboardService(new ButtonDashboardEntity()));
	}
}
