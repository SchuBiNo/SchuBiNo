import UserModel from '@/models/User';
import bcrypt from 'bcrypt';
import dbConnect from './dbConnect';

export async function authenticateLogin(credentials) {
	const { email, password } = credentials;
	const userData = await UserModel.findOne({ email: email });
	if (!userData) {
		return null;
	}
	try {
		if (await bcrypt.compare(password, userData.password)) {
			return { name: userData.name, email: userData.email };
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
		return null;
	}
}
