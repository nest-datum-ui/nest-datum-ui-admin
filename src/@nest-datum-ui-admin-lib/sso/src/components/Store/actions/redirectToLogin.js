
export const fireRedirectToLogin = (authFlag, url) => {
	if (!authFlag) {
		window.location.href = url;
	}
};
