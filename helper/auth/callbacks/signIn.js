export default async ({ user, account, profile, email, credentials }) => {
	console.log('signIn');
	if (account.provider === 'google') {
		return profile.email_verified;
	}
	return Promise.resolve(user);
};
