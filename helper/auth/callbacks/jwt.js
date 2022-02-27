import updateUserAuth from '@/helper/database/updateUserAuth';
import { refreshToken as githubRefresh } from 'helper/auth/providers/github';
import { refreshToken as googleRefresh } from '../providers/google';

export default async ({ token, user, account }) => {
	console.log('jwt');

	if (account?.provider == 'credentials') return Promise.resolve(token);

	if (account && user) {
		token.access_token = account.access_token;
		token.refresh_token = account.refresh_token;
		token.expires = account.expires_at;
		token.provider = account.provider;
		token.providerId = account.providerAccountId;
		token.databaseId = user.databaseId;

		return Promise.resolve(token);
	}

	if (token.expires >= Date.now() / 1000) {
		let newToken;
		switch (token.provider) {
			case 'github':
				newToken = await githubRefresh(token);
				break;
			case 'google':
				newToken = await googleRefresh(token);
				break;
		}

		await updateUserAuth(newToken);
		return Promise.resolve(newToken);
	}

	return Promise.resolve(token);
};
