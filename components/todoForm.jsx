import React from 'react';
import events from '@/helper/calendar/events';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			date: '',
			completed: false,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, date, completed } = this.state;
		this.props.callback({
			id: 1,
			title: title,
			completed: false,
			date: date,
		});
	};

	handleCancel = (event) => {
		this.props.callback();
	};

	render() {
		return (
			<a className='list-group-item list-group-item-action'>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							className='form-control mt-2'
							type='text'
							name='title'
							placeholder='Your Title'
							onChange={this.handleChange}
						/>
					</div>
					<div className='mt-3'>
						<span class='form-text'>Date:</span>
						<input
							className='form-control form-control-sm'
							type='date'
							name='date'
							onChange={this.handleChange}
						/>
					</div>
					<button className='btn btn-primary mt-3' type='submit'>
						Save
					</button>
					<button
						className='btn btn-secondary mt-3 mx-2'
						onClick={this.handleCancel}>
						Cancel
					</button>
				</form>
			</a>
		);
	}
}

export default TodoForm;
