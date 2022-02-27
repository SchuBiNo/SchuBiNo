import { dbConnect } from '@/helper/database/dbConnect';
import OAuthUser from '@/models/OAuthUser';
import addUser from '@/helper/database/addUser';

export default async ({ user, account, profile }) => {
	console.log('signIn');
	if (account.provider === 'google' && !profile.email_verified) {
		return false;
	}
	if (account.provider === 'credentials') return Promise.resolve(user);

	await dbConnect();

	console.log('more signin');

	let dbUser = await OAuthUser.findOne({
		'oauth.provider': account.provider,
		'oauth.account_id': account.providerAccountId,
	});
	console.log('dbUser:', dbUser);

	if (!dbUser) {
		console.log('creating new user');
		dbUser = await addUser(account);
	}

	user.databaseId = dbUser.user_id;
	return Promise.resolve(user);
};
