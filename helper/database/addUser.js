import { dbConnect } from './dbConnect';
import OAuthUser from '@/models/OAuthUser';
import { customAlphabet } from 'nanoid';

export default async (account) => {
	console.log('add user');
	const nanoid = customAlphabet(
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		8
	);
	console.log(nanoid());
	console.log(account);
	await dbConnect();
	const user = new OAuthUser({
		user_id: nanoid(),
		oauth: {
			provider: account.provider,
			account_id: account.providerAccountId,
			access_token: account.access_token,
			refresh_token: account.refresh_token,
			expires: account.expires_at,
		},
	});

	await user.save().catch((e) => {
		console.log(e);
	});
	return Promise.resolve(user);
};
