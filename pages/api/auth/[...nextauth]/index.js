import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
//import MongoDB from 'next-auth/adapters/mongo';
import { authenticateLogin } from '@/helper/authenticateCredentials';
export default NextAuth({
	providers: [
		CredentialsProvider({
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
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	session: {
		jwt: true,
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin',
		newUser: '/welcome',
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (account.provider === 'google') {
				return profile.email_verified;
			}
			return user;
		},

		async redirect({ url, baseUrl }) {
			return url.query?.callbackUrl || baseUrl;
		},
	},
	events: {},
});
