import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const jobOptionRelationForm = {
	id: 'jobs-job-option-relations-form',
	storeName: 'jobs-job-option-relations-form',
	apiUrl: 'post/:id/option',

	title: 'Job',

	post: {
		apiUrl: 'post/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'jobs-job-option-relations-form',
		apiUrl: 'post',
		name: 'jobId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default jobOptionRelationForm;
