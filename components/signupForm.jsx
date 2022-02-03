import React from 'react';
import events from '@/helper/calendar/eventManager';
import axios from 'axios';

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			message: '',
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const { name, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			this.setState({ message: 'Passwords do not match' });
			return;
		}
		await axios
			.post('/api/auth/signup', {
				name,
				email,
				password,
			})
			.catch((error) => {
				console.log(error.response?.data.message);
				this.setState({ message: error.response?.data.message });
			});
		this.props.callback();
	};

	handleCancel = (event) => {
		this.props.callback();
	};

	render() {
		return (
			<div>
				<a className='text-danger'>{this.state.message}</a>
				<form onSubmit={this.handleSubmit}>
					<div class='form-group'>
						<label for='name'>Name</label>
						<input
							type='text'
							id='name'
							name='name'
							required
							class='form-control'
							onChange={this.handleChange}></input>
					</div>
					<div class='form-group'>
						<label for='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							required
							class='form-control'
							onChange={this.handleChange}></input>
					</div>
					<div class='form-group'>
						<label for='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							required
							class='form-control'
							onChange={this.handleChange}></input>
					</div>
					<div class='form-group'>
						<label for='confirmPassword'>Confirm Password</label>
						<input
							type='password'
							id='confirmPassword'
							name='confirmPassword'
							required
							class='form-control'
							onChange={this.handleChange}></input>
					</div>
					<button class='btn btn-primary mt-3 mb-4 form-control' type='submit'>
						Register
					</button>
				</form>
			</div>
		);
	}
}

export default SignUpForm;
