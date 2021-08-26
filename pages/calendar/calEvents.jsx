import stringHash from 'string-hash';
import { format } from 'date-fns';
import dbConnect from '../../helper/dbConnect';

function getDateHash(value) {
	return stringHash(format(value, 'dd-MM-yyyy'));
}

export function loadEvents(date, events) {
	let hash = getDateHash(date);
	if (events[hash] != undefined) {
		return events[hash];
	}
	return undefined;
}
export function addEvent(date, events, title, desc) {
	let editEvents = { ...events };
	let hash = getDateHash(date);
	let id = `${hash}` + editEvents[hash]?.length ?? 0;
	let event = {
		id: id,
		title: title,
		description: desc,
	};
	if (editEvents[hash] == undefined) editEvents[hash] = [];
	editEvents[hash]?.push(event);

	return editEvents;
}

export function hasEvents(date, events) {
	let hash = getDateHash(date);
	return events[hash]?.length ? (
		<span className='badge rounded-pill bg-primary'>📑</span>
	) : (
		''
	);
}
