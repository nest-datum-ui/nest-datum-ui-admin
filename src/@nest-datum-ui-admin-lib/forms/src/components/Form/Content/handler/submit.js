import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	actionApiFormCreate,
	actionApiFormUpdate, 
} from '@nest-datum-ui/Store';
import {
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';

const submit = async (e, storeName, apiUrl, entityId) => {
	const validatedData = await utilsValidateStore(storeName, {
		id: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
		},
		formId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrIdExists ],
			isRequired: true,
		},
		contentStatusId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrIdExists ],
			isRequired: true,
		},
		userId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrIdExists ],
			isRequired: true,
		},
		isNotDelete: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckBool ]
		}
	});

	if (validatedData) {
		utilsCheckStrIdExists(entityId)
			? actionApiFormUpdate(storeName, { apiUrl, entityId })()
			: actionApiFormCreate(storeName, { apiUrl, redirect: true })();
	}
};

export default submit;
