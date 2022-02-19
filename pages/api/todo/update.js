import Todo from '@/models/Todo';
import { dbConnect } from '@/helper/database/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await dbConnect();

		const { userId, todos } = req.body;
		console.log('Req.body:', req.body);

		await Todo.findOneAndUpdate(
			{ userId: userId },
			{ todos: todos },
			{ new: true, upsert: true }
		).catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
		});
		res.status(200).send('Ok, added to database!✔');
	} else {
		res.status(400).json({ message: 'Invalid request type!❌' });
	}
}
