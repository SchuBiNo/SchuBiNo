import Todo from '@/models/Todo';
import { dbConnect } from '@/helper/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await dbConnect();

		const { userId, todoId } = req.body;
		console.log('Req.body:', req.body);

		await Todo.findOneAndDelete({
			_id: todoId,
			userId: userId,
		}).catch((err) => {
			console.log(err);
			res
				.status(500)
				.send('An error occured while trying to update the Database!');
		});
		res.status(200).send('Ok, deleted from database!🗑');
	} else {
		res.status(400).json({ message: 'Invalid request type!❌' });
	}
}
