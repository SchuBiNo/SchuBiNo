import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from '@/helper/auth/providers/github';
import GoogleProvider from '@/helper/auth/providers/google';
import { authenticateLogin } from '@/helper/auth/authenticateCredentials';
import signIn from '@/helper/auth/callbacks/signIn';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
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
			},
			async authorize(credentials) {
				const user = await authenticateLogin(credentials);
				return user;
			},
		}),
		GitHubProvider,
		GoogleProvider,
	],
	callbacks: {
		signIn,
	},

	pages: {
		signIn: '/auth/signin',
	},
});
