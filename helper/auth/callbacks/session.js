export default async ({ session, user, token }) => {
	console.log('session');
	if (token.provider === 'credentials') return Promise.resolve(session);

	session.access_token = token.access_token;
	session.refresh_token = token.refresh_token;
	session.expires = token.expires;
	session.provider = token.provider;
	session.providerId = token.providerId;
	session.databaseId = token.databaseId;

	return Promise.resolve(session);
};
