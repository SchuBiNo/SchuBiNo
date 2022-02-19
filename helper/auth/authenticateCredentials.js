import UserModel from '@/models/User';
import bcrypt from 'bcrypt';
import { dbConnect } from '../database/dbConnect';

export async function authenticateLogin(credentials) {
	await dbConnect();
	console.log('authenticating login');
	console.log(credentials);
	const { email, password } = credentials;
	const userData = await UserModel.findOne({ email: email });
	if (!userData) {
		return null;
	}
	try {
		if (await bcrypt.compare(password, userData.password)) {
			console.log('UserData:', userData);
			return {
				name: userData.name,
				email: userData.email,
				id: userData._id.toString(),
			};
		} else {
			console.log('invalid password');
			return null;
		}
	} catch (e) {
		console.log(e);
		return null;
	}
}
