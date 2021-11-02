import CalEvent from '@/models/CalEvent';
import { dbConnect } from '@/helper/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		await dbConnect();

		const { userId, date, events } = req.body;
		console.log('Req.body:', req.body);

		if (await CalEvent.exists({ userId: userId, date: date })) {
			await CalEvent.findOneAndUpdate(
				{ userId: userId, date: date },
				{ events: events }
			);
			res.status(200).send('Ok, updated database!🔄');
		} else {
			const newEvent = new CalEvent({
				userId: userId,
				date: date,
				events: events,
			});
			await newEvent.save().catch((err) => {
				console.log(err);
				res.status(500).send('Saving to databse failed!');
			});
			res.status(200).send('Ok, added to database!✔');
		}
	} else {
		res.status(400).send('Invalid request type!❌');
	}
}
