import events from '../calendar/eventManager';
import { addDays } from 'date-fns';

export function loadNextEvents(days, startDay, amountToReturn) {
	let day = startDay;
	let amountLeft = amountToReturn;
	let nextEvents = [];
	let tempDailyEvents;
	for (let i = 0; i < days; i++) {
		tempDailyEvents = events.getEventsForDate(day);
		tempDailyEvents?.forEach((item) => {
			if (amountLeft > 0) {
				nextEvents.push(item);
				amountLeft--;
			}
		});
		if (amountLeft == 0) return nextEvents;
		day = addDays(day, 1);
	}
	return nextEvents;
}
