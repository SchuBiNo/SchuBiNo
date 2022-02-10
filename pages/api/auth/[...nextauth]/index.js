import NextAuth from 'next-auth';
import GitHubProvider from '@/helper/auth/providers/github';
import GoogleProvider from '@/helper/auth/providers/google';
import CredentialsProvider from '@/helper/auth/providers/credentials';
import signIn from '@/helper/auth/callbacks/signIn';
import redirect from '@/helper/auth/callbacks/redirect';

export default NextAuth({
	providers: [CredentialsProvider, GitHubProvider, GoogleProvider],
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin',
		newUser: '/welcome',
	},
	callbacks: {
		signIn,
		//redirect,
	},
	session: { jwt: true },
	secret: process.env.NEXTAUTH_SECRET,
});
