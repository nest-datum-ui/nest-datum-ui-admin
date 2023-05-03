import { 
	obj as utilsCheckObj,
	objFilled as utilsCheckObjFilled,
	strFilled as utilsCheckStrFilled, 
} from '@nest-datum-utils/check';

const httpErrorMessage = (err, title = 'Unhandled error') => {
	console.log('err', typeof err === 'object', utilsCheckObj(err));

	if (!utilsCheckObj(err)) {
		return title;
	}
	else if (utilsCheckObjFilled(err['response'])) {
		if (utilsCheckStrFilled(err['response']['statusText'])) {
			return err['response']['statusText'] || err['message'] || title;
		}
		else if (utilsCheckObjFilled(err['response']['data'])) {
			if (utilsCheckStrFilled(err['response']['data']['message'])) {
				return err['response']['data']['message'] || err['message'] || title;
			}
			else if (utilsCheckObjFilled(err['response']['data']['error'])) {
				return err['response']['data']['error']['text'] || err['message'] || title;
			}
		}
	}
	return err['message'] || title;
};

export default httpErrorMessage;
