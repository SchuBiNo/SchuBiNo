import { loadEvents } from './calEvents';
import { addDays } from 'date-fns';

//days = amount of days to consider; amount = amount to return
export function loadNextEvents(days, startDay, amount) {
	let day = startDay;
	let amountLeft = amount;
	let events = [];
	let tempDailyEvents;
	for (let i = 0; i < days; i++) {
		tempDailyEvents = loadEvents(day);
		console.log(tempDailyEvents);
		tempDailyEvents?.forEach((item) => {
			if (amountLeft > 0) {
				events.push(item);
				amountLeft--;
			}
		});
		if (amountLeft == 0) return events;
		console.log(day);
		day = addDays(day, 1);
	}
	return events;
}
