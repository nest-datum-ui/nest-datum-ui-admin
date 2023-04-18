import { actionApiFormPurge } from '@nest-datum-ui/Store';

export const fireLogout = async (storeName) => {
	actionApiFormPurge(storeName)();

	localStorage.removeItem(`${process.env.URL_UI}_accessToken`);
	localStorage.removeItem(`${process.env.URL_UI}_refreshToken`);

	window.location.href = '/';
};
