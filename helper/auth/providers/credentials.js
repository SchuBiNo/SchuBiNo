import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateLogin } from '../authenticateCredentials';

const params = {
	email: {
		label: 'email',
		type: 'email',
		required: true,
		placeholder: 'email@email.com',
	},
	password: {
		label: 'password',
		type: 'password',
		required: true,
	},
};

export default CredentialsProvider({
	name: 'credentials',
	credentials: params,
	async authorize(credentials) {
		const user = await authenticateLogin(credentials);
		return user;
	},
});
