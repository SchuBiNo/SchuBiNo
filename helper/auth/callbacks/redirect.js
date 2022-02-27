export default async ({ url, baseUrl }) => {
	console.log('redirect');
	if (url.includes(baseUrl))
		return Promise.resolve(url.query?.callbackUrl || url);
	return Promise.resolve(baseUrl);
};
