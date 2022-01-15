import { hash } from 'bcrypt';
import { dbConnect } from '@/helper/dbConnect';
import UserModel from '@/models/User';
async function handler(req, res) {
	//Only POST mothod is accepted
	if (req.method === 'POST') {
		//Getting email and password from body
		const { name, email, password } = req.body;
		console.log(name + ' ' + email + ' ' + password);
		//Validate
		if (!email || !email.includes('@') || !password) {
			res.status(422).json({ message: 'Invalid email or password' });
			return;
		}
		//Connect with database
		await dbConnect();

		//Check existing
		const checkExisting = await UserModel.findOne({
			$or: [{ name: name }, { email: email }],
		}).catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
			return;
		});
		//Send error response if duplicate user is found
		if (checkExisting?.name === name) {
			res.status(422).json({ message: 'Name already exists' });
			return;
		} else if (checkExisting?.email === email) {
			res.status(422).json({ message: 'Email already exists' });
			return;
		}

		const user = new UserModel({
			name: name,
			email: email,
			password: await hash(password, 10),
		});
		user.save().catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
		});
		//Send success response
		res.status(201).send('User created');
	} else {
		//Response for other than POST method
		res.status(500).json({ message: 'Only POST method is accepted' });
	}
}

export default handler;
