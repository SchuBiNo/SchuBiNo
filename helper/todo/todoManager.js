import axios from 'axios';

class TodoManager {
	constructor() {}

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

	getTodosFromDB = async (username) => {
		let todos;
		let userId = await this.#getUserId(username);
		/* await axios
			.post('/api/todo/get', {
				userId: userId,
			})
			.then(function (response) {
				todos = response.data;
			})
			.catch(function (error) {
				console.log(error);
			}); */
		let res = await fetch(`/api/todo/get`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
			}),
		}).catch((error) => {
			console.log(error);
		});
		res = await res.json();
		todos = res.data;

		return todos;
	};

	async addTodo(date, title, username) {
		let userId = await this.#getUserId(username);
		/* await axios
			.post('/api/todo/add', {
				userId: userId,
				date: date,
				title: title,
			})
			.then(function (response) {
				console.log('Response:', response);
			})
			.catch(function (error) {
				console.log(error);
			}); */
		await fetch('/api/todo/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				date: date,
				title: title,
			}),
		})
			.then((res) => {
				console.log('Response:', res);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async deleteTodoToDB(username, todoId) {
		//let success = false;
		let userId = await this.#getUserId(username);
		/* await axios
			.delete('/api/todo/delete', {
				data: { userId: userId, todoId: todoId },
			})
			.then(function (response) {
				console.log('Response:', response);
			})
			.catch(function (error) {
				console.log(error);
			}); */
		await fetch('/api/todo/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				todoId: todoId,
			}),
		})
			.then((res) => {
				console.log('Response:', res);
			})
			.catch((error) => {
				console.log(error);
			});

		//if (success) {
		//	let index = this.#events[hash]?.indexOf((el) => {
		//		el.id == eventId;
		//	});
		//	this.#events[hash]?.splice(index, 1);
		//	callback();
		//}
	}
}

let todoManager;

(() => {
	if (todoManager instanceof TodoManager) return;
	else todoManager = new TodoManager();
})();

export default todoManager;
