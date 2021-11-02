import CalEvent from '@/models/CalEvent';
import { dbConnect } from '@/helper/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		await dbConnect();

		const { userId, date, eventId } = req.body;
		console.log('Req.body:', req.body);

		if (await CalEvent.exists({ userId: userId, date: date })) {
			let event = await CalEvent.findOne({ userId: userId, date: date });
			let eventIndex = event.events.findIndex((el) => el.id == eventId);
			event.events.splice(eventIndex, 1);
			console.log(event.events);
			if (event.events.length == 0) {
				await CalEvent.findOneAndDelete({ userId: userId, date: date }).catch(
					(err) => {
						console.log(err);
						res
							.status(500)
							.send('An error occured while trying to update the Database!');
					}
				);
			} else {
				await CalEvent.findOneAndUpdate(
					{ userId: userId, date: date },
					{ events: event.events }
				).catch((err) => {
					console.log(err);
					res
						.status(500)
						.send('An error occured while trying to update the Database!');
				});
			}
			res.status(200).send('Ok, added to database!✔');
		} else {
			res.status(404).send('No entry in Database!');
		}
	} else {
		res.status(400).send('Invalid request type!❌');
	}
}
