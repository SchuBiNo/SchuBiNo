import stringHash from 'string-hash';
import {
	add,
	addDays,
	compareAsc,
	format,
	getDaysInMonth,
	startOfDay,
	parseISO,
	startOfMonth,
} from 'date-fns';

class EventManager {
	#events = {};
	#syncedMonths = [];

	constructor() {}

	#syncMonth = async (date, username, refreshCallback) => {
		console.log('username:', username);
		if (username) {
			console.log('syncing month');
			await this.#loadMonthFromDB(date, username).then((result) => {
				if (result) {
					console.log(startOfMonth(date));
					this.#syncedMonths.push(startOfMonth(date));

					refreshCallback();
				}
				console.log(result);
				this.#storeEventsLocally(result);
			});
			return;
		} else {
			return;
		}
	};

	#getUserId = async (username) => {
		let userId;
		await fetch(`/api/user/${username}/id`)
			.then((response) => response.json())
			.then((data) => {
				userId = data.id;
			})
			.catch((error) => {
				console.log(error);
			});

		return userId;
	};

	#loadMonthFromDB = async (date, username) => {
		let data;
		let startDate = startOfMonth(date);
		let days = getDaysInMonth(date);
		let userId = await this.#getUserId(username);
		days = [...Array(days).keys()].map((x) => addDays(startDate, x));
		let res = await fetch('/api/calendar/get', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				dates: days,
			}),
		}).catch((error) => {
			console.log(error);
		});
		console.log(res);
		data = await res.json();
		return data;
	};

	#getDateHash = (value) => {
		return stringHash(format(value, 'dd-MM-yyyy'));
	};

	#getID = (hash) => {
		return `${hash}` + (this.#events[hash]?.length ?? 0);
	};

	#dateIsSynced = (date) => {
		return this.#syncedMonths.find(
			(x) => compareAsc(x, startOfMonth(date)) === 0
		)
			? true
			: false;
	};

	#storeEventsLocally = (events) => {
		events?.forEach((day) => {
			console.log(day.date);
			let hash = this.#getDateHash(parseISO(day.date));
			this.#events[hash] = [...day.events];
		});
	};

	#addTimeToDate = (date, time) => {
		console.log(time);
		console.log('oldDate:', date);
		date = startOfDay(date);
		console.log('start of date:', date);
		//time is number --> add hours
		if (typeof time === 'number') return add(date, { hours: time });
		//time is hh:mm formart --> add hours and minutes
		if (typeof time === 'string' && time.includes(':', 2))
			return add(date, {
				hours: time.slice(0, 2),
				minutes: time.slice(3),
			});
		else return date;
	};

	async getEventsForDate(date, username, refreshCallback = () => {}) {
		console.log(date);
		if (!this.#dateIsSynced(date)) {
			console.log('not synced');
			await this.#syncMonth(date, username, refreshCallback);
			let hash = await this.#getDateHash(date);
			return this.#events[hash];
		} else {
			let hash = this.#getDateHash(date);
			return this.#events[hash];
		}
	}

	async addEvent(date, title, desc, startTime, flare, username) {
		let hash = this.#getDateHash(date);
		let id = this.#getID(hash);
		let event = {
			id: id,
			title: title,
			description: desc,
			flare: flare,
			date: this.#addTimeToDate(date, startTime),
		};
		if (this.#events[hash] == undefined) this.#events[hash] = [];
		this.#events[hash]?.push(event);
		let userId = await this.#getUserId(username);
		await fetch('/api/calendar/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				date: date,
				events: this.#events[hash],
			}),
		})
			.then((response) => {
				console.log('Response:', response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async deleteEvent(date, username, eventId, callback) {
		let success = false;
		let hash = this.#getDateHash(date);
		let userId = await this.#getUserId(username);
		await fetch('/api/calendar/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				date: date,
				eventId: eventId,
			}),
		})
			.then((response) => {
				console.log('Response:', response);
				success = true;
			})
			.catch((error) => {
				console.log(error);
			});
		if (success) {
			let index = this.#events[hash]?.indexOf((el) => {
				el.id == eventId;
			});
			this.#events[hash]?.splice(index, 1);
			callback();
		}
	}

	dateHasEvents(date) {
		let hash = this.#getDateHash(date);
		return this.#events[hash]?.length ? true : false;
	}
}

let eventManager;

(() => {
	if (eventManager instanceof EventManager) return;
	else eventManager = new EventManager();
})();

export default eventManager;
