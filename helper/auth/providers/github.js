import axios from 'axios';
import GitHubProvider from 'next-auth/providers/github';

if (!process.env.GITHUB_ID) throw new Error('Set GITHUB_ID process env');
if (!process.env.GITHUB_SECRET)
	throw new Error('Set GITHUB_SECRET process env');
if (!process.env.GITHUB_SCOPE) throw new Error('Set GITHUB_SCOPE process env');

const params = {
	scope: process.env.GITHUB_SCOPE,
};

export default GitHubProvider({
	clientId: process.env.GITHUB_ID,
	clientSecret: process.env.GITHUB_SECRET,
	authorization: {
		params,
	},
});

export const refreshToken = async (token) => {};
