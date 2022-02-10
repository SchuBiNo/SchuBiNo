import axios from 'axios';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.GOOGLE_CLIENT_ID)
	throw new Error('Set GOOGLE_CLIENT_ID process env');
if (!process.env.GOOGLE_CLIENT_SECRET)
	throw new Error('Set GOOGLE_CLIENT_SECRET process env');
if (!process.env.GOOGLE_SCOPE) throw new Error('Set GOOGLE_SCOPE process env');

const params = {
	prompt: 'consent',
	access_type: 'offline',
	response_type: 'code',
	scope: process.env.GOOGLE_SCOPE,
};

export default GoogleProvider({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	authorization: {
		params,
	},
});

export const refreshToken = async (token) => {
	console.log('google refresh');
	const url = 'https://oauth2.googleapis.com/token';

	const body = {
		grant_type: 'refresh_token',
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		refresh_token: token.refresh_token,
	};

	const headers = {
		'content-type': 'application/x-www-form-urlencoded',
	};

	const data = await axios.post(url, new URLSearchParams(body).toString(), {
		headers,
	});

	token.access_token = data.data.access_token;
	token.refresh_token = data.data.refresh_token || token.refresh_token;
	token.expires = Math.floor(Date.now() / 1000) + data.data.expires_in;
	token.provider = 'google';

	return Promise.resolve(token);
};
