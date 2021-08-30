import React from 'react';
import { addEvent } from '@/helper/calendar/calEvents';

class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			flare: '',
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, description, flare } = this.state;
		if (title != '') addEvent(this.props.date, title, description, flare);
		this.props.callback();
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
					<div>
						<input
							className='form-control mt-2'
							type='text'
							name='description'
							placeholder='Your Description'
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							className='form-control mt-2'
							type='text'
							name='flare'
							placeholder='Set flare (optional)'
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

export default EventForm;
