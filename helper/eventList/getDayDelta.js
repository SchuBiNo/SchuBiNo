import { differenceInCalendarDays } from 'date-fns';

export function getDayDeltaText(dayOne, dayTwo) {
	console.log('dayOne:', dayOne, 'dayTwo:', dayTwo);
	let difference = differenceInCalendarDays(dayOne, dayTwo);
	switch (difference) {
		case 1:
			return 'Yesterday';
			break;
		case 0:
			return 'Today';
			break;
		case -1:
			return 'Tomorrow';
			break;
		default:
			return `In ${-difference} Days`;
	}
}

export function getDayDeltaNumber(dayOne, dayTwo) {
	return differenceInCalendarDays(dayOne, dayTwo);
}
