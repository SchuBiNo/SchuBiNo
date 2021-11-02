import React from 'react';
import events from '@/helper/calendar/events';

class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			startTime: '',
			flare: '',
		};
	}

	handleChange = (event) => {
		console.log(event.target.value);
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, description, startTime, flare } = this.state;
		if (title != '')
			events.addEvent(
				this.props.date,
				title,
				description,
				startTime,
				flare,
				this.props.username
			);
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
					<div className='mt-4'>
						<span class='form-text'>Set start & end time.</span>
						<input
							className='form-control form-control-sm'
							type='time'
							name='startTime'
							onChange={this.handleChange}
						/>
						<input
							className='form-control form-control-sm  mt-2'
							type='time'
							name='endTime'
							onChange={this.handleChange}
						/>
					</div>
					<div className=' mt-4'>
						<span class='form-text'>Set flare and color.</span>
						<input
							className='form-control'
							type='text'
							name='flare'
							placeholder='Set flare (optional)'
							onChange={this.handleChange}
						/>
						<input
							className='form-control mt-2'
							list='datalistOptions'
							id='exampleDataList'
							placeholder='Type to search...'
						/>
						<datalist id='datalistOptions'>
							<option value='Blue' />
							<option value='Grey' />
							<option value='Green' />
							<option value='Red' />
							<option value='Yellow' />
							<option value='Cyan' />
						</datalist>
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
