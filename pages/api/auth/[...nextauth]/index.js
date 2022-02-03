import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { authenticateLogin } from '@/helper/authenticateCredentials';
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
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin',
		newUser: '/welcome',
	},
	callbacks: {
		signIn: async (user, account, profile) => {
			console.log('signIn:', user, account, profile);
			return user;
		},
		redirect: async (url, baseUrl) => {
			if (url.startsWith(baseUrl)) return url;
			// Allows relative callback URLs
			else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
			return baseUrl;
		},
	},
	events: {
		createUser: async (user, account, profile) => {
			console.log('createUser:', user, account, profile);
			return user;
		},
	},
};

export default function (req, res) {
	return NextAuth(req, res, options);
}
