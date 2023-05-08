import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	actionApiFormCreate,
	actionApiFormUpdate, 
} from '@nest-datum-ui/Store';
import {
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists,
	strExists as utilsCheckStrExists,
	strName as utilsCheckStrName,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';

const submit = async (e, storeName, apiUrl, entityId) => {
	const validatedData = await utilsValidateStore(storeName, {
		id: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
		},
		lensaId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrIdExists ],
			isRequired: true,
		},
		targetId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrIdExists ],
			isRequired: true,
		},
		source: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
		candidateSource: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
		customerCategory: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
		language: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
		jobTitle: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
		firstName: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrName ],
			isRequired: true,
		},
		email: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrEmail ],
			isRequired: true,
		},
		state: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
		city: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrExists ],
			isRequired: true,
		},
	});

	if (validatedData) {
		utilsCheckStrIdExists(entityId)
			? actionApiFormUpdate(storeName, { apiUrl, entityId })()
			: actionApiFormCreate(storeName, { apiUrl, redirect: true })();
	}
};

export default submit;
