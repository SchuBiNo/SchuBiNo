import NextAuth from 'next-auth';
import CredentialsProvider from '@/helper/auth/providers/credentials';
import GitHubProvider from '@/helper/auth/providers/github';
import GoogleProvider from '@/helper/auth/providers/google';
import signIn from '@/helper/auth/callbacks/signIn';
import session from '@/helper/auth/callbacks/session';
import jwt from '@/helper/auth/callbacks/jwt';
import redirect from '@/helper/auth/callbacks/redirect';

export default NextAuth({
	providers: [CredentialsProvider, GitHubProvider, GoogleProvider],
	callbacks: {
		signIn,
		jwt,
		session,
		redirect,
	},

	pages: {
		signIn: '/auth/signin',
	},
});
