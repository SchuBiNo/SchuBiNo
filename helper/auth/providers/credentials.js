import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateLogin } from '@/helper/auth/authenticateCredentials';

const credentialsParams = {
	email: {
		label: 'Email',
		type: 'text',
		placeholder: 'email@email.com',
	},
	password: { label: 'Password', type: 'password' },
};

export default CredentialsProvider({
	name: 'Credentials',
	async authorize(credentials, req) {
		const user = await authenticateLogin(credentials);
		return user;
	},
	credentials: credentialsParams,
});
