class GradesManager {
	#grades = [];

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

	getGrades = async (username, provider) => {
		if (!username) return this.#grades;
		let userId = await this.#getUserId(username, provider);
		let res = await fetch(`/api/grades/get`, {
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

		let grades = data.grades;

		if (grades) {
			this.#grades = grades;
			return this.#grades;
		} else {
			return this.#grades;
		}
	};

	async setGrades(grades, username, provider) {
		console.log('username:', username, 'provider:', provider);
		if (!grades || !username) return this.#grades;
		let userId = await this.#getUserId(username, provider);
		console.log('userId:', userId);
		this.#grades = grades;

		await fetch('/api/grades/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				grades: this.#grades,
			}),
		})
			.then((res) => {
				console.log('Response:', res);
			})
			.catch((error) => {
				console.log(error);
			});

		return this.#grades;
	}
}

let gradesManager;

(() => {
	if (gradesManager instanceof GradesManager) return;
	else gradesManager = new GradesManager();
})();

export default gradesManager;
