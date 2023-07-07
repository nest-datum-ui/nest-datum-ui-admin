import axios from 'axios';
import {
	strPassword as utilsCheckStrPassword,
	strUserName as utilsCheckStrUserName,
	strUserLogin as utilsCheckStrUserLogin,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	actionApiFormClear,
	actionApiFormProp,
} from '@nest-datum-ui/Store';

export const fireRegister = (storeName, apiUrl) => async (callback = () => {}) => {
	try {
		actionApiFormProp(storeName, 'loader', true)();

		const validatedData = await utilsValidateStore(storeName, {
			login: {
				text: 'Login is not valid.',
				check: [ utilsCheckStrUserLogin ],
				isRequired: true,
			},
			email: {
				text: 'Email is not valid.',
				check: [ utilsCheckStrEmail ],
				isRequired: true,
			},
			firstname: {
				text: 'First name is not valid.',
				check: [ utilsCheckStrUserName ],
				isRequired: true,
			},
			lastname: {
				text: 'Last name is not valid.',
				check: [ utilsCheckStrUserName ],
				isRequired: true,
			},
			password: {
				text: 'Password is not valid.',
				check: [ utilsCheckStrPassword ],
				isRequired: true,
			},
			repeatedPassword: {
				text: 'Password is not valid or does not match.',
				check: [
					utilsCheckStrPassword,
					(value, name, data) => {
						return value === data['password'];
					},
				],
				isRequired: true,
			},
		});

		if (validatedData) {
			await axios.post(apiUrl, validatedData);

			actionApiFormClear(storeName, { successfulRegistrationFlag: true })();
		}
	}
	catch (err) {
		actionApiFormClear(storeName)();

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};
