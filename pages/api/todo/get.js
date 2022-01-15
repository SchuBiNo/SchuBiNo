import Todo from '@/models/Todo';
import { dbConnect } from '@/helper/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await dbConnect();

		const { userId } = req.body;
		let results = await Todo.find({
			userId: userId,
		}).catch((err) => {
			console.log('Unexpected Database error!', err);
			res.status(500).send('Unexpected Database error!');
		});

		res.status(200).json(results);
	} else {
		console.log('Invalid request type!❌');
		res.status(400).send('Invalid request type!❌');
	}
}
