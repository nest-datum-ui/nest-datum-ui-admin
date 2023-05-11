import userName from './userName.js';
import email from './email.js';

const userLogin = (value) => userName(value) || email(value);

export default userLogin;
