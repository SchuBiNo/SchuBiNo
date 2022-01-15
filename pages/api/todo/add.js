import Todo from '@/models/Todo';
import { dbConnect } from '@/helper/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await dbConnect();

		const { userId, date, title } = req.body;
		console.log('Req.body:', req.body);

		const newTodo = new Todo({
			userId: userId,
			date: date,
			title: title,
		});
		await newTodo.save().catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
		});
		res.status(200).send('Ok, added to database!✔');
	} else {
		res.status(400).json({ message: 'Invalid request type!❌' });
	}
}
