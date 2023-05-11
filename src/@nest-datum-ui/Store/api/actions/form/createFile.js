import axios from 'axios';
import { objFileList as utilsCheckObjFileList } from '@nest-datum-utils/check';
import { 
	urlApiStr as utilsFormatUrlApiStr,
	formData as utilsFormatFormData, 
	httpErrorMessage as utilsFormatHttpErrorMessage, 
} from '@nest-datum-utils/format';

export const fireFormCreateFile = (apiUrl, data) => async (callback = () => {}, prefix = 'api') => {
	try {
		let key,
			filesResponses = [];

		for (key in data) {
			if (utilsCheckObjFileList(data[key])) {
				const formData = utilsFormatFormData(data[key]);
				const request = await axios.post(utilsFormatUrlApiStr(apiUrl), formData);

				filesResponses.push(request.data);
				data[key] = request.data[0]['id'];
			}
		}
		callback({
			formData: data,
			filesResponses,
		});

		return {
			formData: data,
			filesResponses,
		};
	}
	catch (err) {
		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};
