import { dbConnect } from './dbConnect';
import OAuthUser from '@/models/OAuthUser';

export default async (token) => {
	await dbConnect();

	const user = await OAuthUser.findOneAndUpdate(
		{
			'oauth.provider': token.provider,
			'oauth.account_id': token.providerId,
		},
		{
			'oauth.access_token': token.access_token,
			'oauth.refresh_token': token.refresh_token,
			'oauth.expires': token.expires,
		}
	);

	return Promise.resolve(user);
};
