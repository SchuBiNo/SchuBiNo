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
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	session: {
		jwt: true,
	},
};

export default function (req, res) {
	return NextAuth(req, res, options);
}
