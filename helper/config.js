import dotenv from "dotenv"
dotenv.config({
	path: __dirname + '/../.env',
});

export default {
	mongo: {
		user: process.env.MONGO_USER,
		password: process.env.MONGO_PASSWORD,
		endpoint: process.env.MONGO_ENDPOINT,
	},
};