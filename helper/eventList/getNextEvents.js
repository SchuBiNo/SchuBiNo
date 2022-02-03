import events from '../calendar/eventManager';
import { addDays } from 'date-fns';

export async function loadNextEvents(days, startDay, amountToReturn, username) {
	let day = startDay;
	let amountLeft = amountToReturn;
	let nextEvents = [];
	let tempDailyEvents;
	for (let i = 0; i < days; i++) {
		tempDailyEvents = await events.getEventsForDate(day, username);
		tempDailyEvents?.forEach((item) => {
			if (amountLeft > 0) {
				nextEvents.push(item);
				amountLeft--;
			}
		});
		if (amountLeft == 0) return nextEvents;
		day = addDays(day, 1);
		console.log('here');
	}
	console.log('nextEvents:', nextEvents);
	return nextEvents;
}
