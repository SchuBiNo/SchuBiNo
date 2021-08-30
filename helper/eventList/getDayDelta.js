import { differenceInCalendarDays } from 'date-fns';

export function getDayDelta(dayOne, dayTwo, numMode = false) {
	//numMode = output will be numbers
	let difference = differenceInCalendarDays(dayOne, dayTwo);

	if (numMode == true) return difference;
	else {
		console.log(difference);
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
}
