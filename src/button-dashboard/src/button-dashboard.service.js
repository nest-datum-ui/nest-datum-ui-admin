import { LayoutService } from 'layout';
import { ButtonDashboardEntity } from './button-dashboard.entity.js';

export class ButtonDashboardService extends LayoutService {
	constructor(repository) {
		super(repository ?? new ButtonDashboardEntity());
	}
}
