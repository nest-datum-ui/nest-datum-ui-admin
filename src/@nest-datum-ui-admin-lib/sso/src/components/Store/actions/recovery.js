import axios from 'axios';
import { strEmail as utilsCheckStrEmail } from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	actionApiFormClear,
	actionApiFormProp,
} from '@nest-datum-ui/Store';

export const fireRecovery = async (storeName, apiUrl) => {
	try {
		actionApiFormProp(storeName, 'loader', true)();

		const validatedData = await utilsValidateStore(storeName, {
			email: {
				text: 'Email is not valid.',
				check: [
					utilsCheckStrEmail,
				],
			},
		});

		if (validatedData) {
			await axios.post(apiUrl, { email: validatedData['email'] });

			actionApiFormClear(storeName, { successfulRequestFlag: true })();
		}
	}
	catch (err) {
		actionApiFormClear(storeName)();

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};
