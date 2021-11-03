import stringHash from 'string-hash';
import {
	add,
	addDays,
	addMonths,
	compareAsc,
	format,
	getDaysInMonth,
	startOfDay,
	parseISO,
	startOfMonth,
	subMonths,
} from 'date-fns';
import axios from 'axios';

class Events {
	#events = {};
	#syncedMonths = [];

	constructor() {}

	#syncMonth = (date, username, refreshCallback) => {
		if (username) {
			console.log(date, username);
			this.#loadMonthFromDB(date, username).then((result) => {
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
		await axios
			.get(`/api/user/${username}/id`)
			.then(function (response) {
				userId = response.data.id;
			})
			.catch(function (error) {
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
		await axios
			.post('/api/calendar/get', {
				userId: userId,
				dates: days,
			})
			.then(function (response) {
				data = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
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
		events.forEach((day) => {
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

	getEventsForDate(date, username, refreshCallback) {
		if (!this.#dateIsSynced(date)) {
			this.#syncMonth(date, username, refreshCallback);
			let hash = this.#getDateHash(date);
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
		await axios
			.post('/api/calendar/add', {
				userId: userId,
				date: date,
				events: this.#events[hash],
			})
			.then(function (response) {
				console.log('Response:', response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	async deleteEvent(date, username, eventId, callback) {
		let success = false;
		let hash = this.#getDateHash(date);
		let userId = await this.#getUserId(username);
		await axios
			.delete('/api/calendar/delete', {
				data: { userId: userId, date: date, eventId: eventId },
			})
			.then(function (response) {
				console.log('Response:', response);
				success = true;
			})
			.catch(function (error) {
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

let events;

(() => {
	if (events instanceof Events) return;
	else events = new Events();
})();

export default events;
