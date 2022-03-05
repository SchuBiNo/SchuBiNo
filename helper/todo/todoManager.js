import { nanoid } from 'nanoid';
class TodoManager {
	#todos = [];

	constructor() {}

	#getUserId = async (username) => {
		let userId;
		await fetch(`/api/user/${username}/id`, {
			method: 'GET',
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				userId = data.id;
			})
			.catch((error) => {
				console.log(error);
			});
		return userId;
	};

	getTodos = async (username) => {
		if (!username) return this.#todos;
		let userId = await this.#getUserId(username);
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
		let data = await res.json();

		let todos = data.todos;

		if (todos) {
			this.#todos = todos;
			return this.#todos;
		} else {
			return this.#todos;
		}
	};

	async addTodo(date, title, username) {
		if (!title || !username) return this.#todos;
		let userId = await this.#getUserId(username);
		let todo = {
			todoId: nanoid(8),
			date: date,
			title: title,
		};
		this.#todos.push(todo);

		await fetch('/api/todo/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				todos: this.#todos,
			}),
		})
			.then((res) => {
				console.log('Response:', res);
			})
			.catch((error) => {
				console.log(error);
			});

		return this.#todos;
	}

	async deleteTodo(username, todoId) {
		if (!username || !todoId) return this.#todos;
		let userId = await this.#getUserId(username);
		this.#todos = this.#todos.filter((todo) => todo.todoId !== todoId);
		await fetch('/api/todo/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				todos: this.#todos,
			}),
		})
			.then((res) => {
				console.log('Response:', res);
			})
			.catch((error) => {
				console.log(error);
			});
		return this.#todos;
	}
}

let todoManager;

(() => {
	if (todoManager instanceof TodoManager) return;
	else todoManager = new TodoManager();
})();

export default todoManager;
