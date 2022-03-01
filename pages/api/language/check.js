import axios from 'axios';
import { dbConnect } from '@/helper/database/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await dbConnect();

		const { language, text } = req.body;

		let result = await axios
			.post(`${process.env.LANGUAGE_API_URL}/check/${language}`, {
				text,
				key: process.env.LANGUAGE_API_KEY,
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					error: 'Internal Server Error',
				});
			});
		console.log(result.data);
		res.status(200).json(result.data);
	} else {
		res.status(400).json({ message: 'Invalid request type!❌' });
	}
}
