import React from 'react';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			date: '',
			error: '',
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, date } = this.state;
		let newDate = new Date();
		if (date && Date.parse(date) <= newDate.setHours(0, 0, 0, 0)) {
			this.setState({ error: 'Date must be in the future' });
			return;
		}
		console.log(title, date);
		this.props.callback({
			title: title,
			date: date,
		});
	};

	handleCancel = (event) => {
		this.props.callback();
	};

	render() {
		return (
			<a className='list-group-item list-group-item-action redLine'>
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
						<span className='form-text'>Date:</span>
						<input
							className='form-control form-control-sm'
							type='date'
							name='date'
							onChange={this.handleChange}
						/>
					</div>
					<button className='btn bgdarkred mt-3' type='submit'>
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
