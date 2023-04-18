import { fireAutoLogin as actionSsoAutoLogin } from './actions/autoLogin.js';
import { fireRedirectToLogin as actionSsoRedirectToLogin } from './actions/redirectToLogin.js';
import { fireRegister as actionSsoRegister } from './actions/register.js';
import { fireLogin as actionSsoLogin } from './actions/login.js';
import { fireRecovery as actionSsoRecovery } from './actions/recovery.js';
import { fireReset as actionSsoReset } from './actions/reset.js';
import { fireRefresh as actionSsoRefresh } from './actions/refresh.js';
import { fireVerify as actionSsoVerify } from './actions/verify.js';
import { fireLogout as actionSsoLogout } from './actions/logout.js';

export {
	actionSsoAutoLogin,
	actionSsoRedirectToLogin,
	actionSsoRegister,
	actionSsoLogin,
	actionSsoRecovery,
	actionSsoReset,
	actionSsoRefresh,
	actionSsoVerify,
	actionSsoLogout,
};
