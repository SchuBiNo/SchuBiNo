import stringHash from 'string-hash';
import { format } from 'date-fns';
import dbConnect from './dbConnect';

let events = {};

function getDateHash(value) {
	return stringHash(format(value, 'dd-MM-yyyy'));
}

export function loadEvents(date) {
	let hash = getDateHash(date);
	if (events[hash] != undefined) {
		return events[hash];
	}
	return undefined;
}
export function addEvent(date, title, desc) {
	let hash = getDateHash(date);
	let id = `${hash}` + events[hash]?.length ?? 0;
	let event = {
		id: id,
		title: title,
		description: desc,
	};
	if (events[hash] == undefined) events[hash] = [];
	events[hash]?.push(event);
}

export function hasEvents(date) {
	let hash = getDateHash(date);
	return events[hash]?.length ? (
		<span className='badge rounded-pill bg-primary'>📑</span>
	) : (
		''
	);
}
