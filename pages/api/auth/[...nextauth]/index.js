import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { authenticateLogin } from '@/helper/credentialsAuth';
const options = {
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'email@email.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const user = await authenticateLogin(credentials);
				return user;
			},
		}),
	],
	session: {
		jwt: true,
	},
};

export default function (req, res) {
	return NextAuth(req, res, options);
}
