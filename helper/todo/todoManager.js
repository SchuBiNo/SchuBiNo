import { nanoid } from 'nanoid';
class TodoManager {
	#todos = [];

	constructor() {}

	#getUserId = async (username, provider) => {
		let userId;
		let userEndpoint = provider == 'credentials' ? 'user' : 'oauthuser';
		console.log('Endpoint:', `/api/${userEndpoint}/${username}/id`);
		await fetch(`/api/${userEndpoint}/${username}/id`)
			.then((response) => response.json())
			.then((data) => {
				userId = data.id;
			})
			.catch((error) => {
				console.log(error);
			});
		console.log('userId:', userId);
		return userId;
	};

	getTodos = async (username, provider) => {
		if (!username) return this.#todos;
		let userId = await this.#getUserId(username, provider);
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

	async addTodo(date, title, username, provider) {
		if (!title || !username) return this.#todos;
		let userId = await this.#getUserId(username, provider);
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

	async deleteTodo(username, todoId, provider) {
		if (!username || !todoId) return this.#todos;
		let userId = await this.#getUserId(username, provider);
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
