import React from 'react';
import events from '@/helper/calendar/eventManager';

class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			description: null,
			startTime: null,
			endTime: null,
			location: null,
			geo: null,
			categories: null,
			color: null,
			isPublic: false,
			organizer: null,
			attendees: null,
			url: null,
			error: null,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.props.username);

		if (!this.state.title) {
			this.setState({ error: 'Title is required' });
			return;
		}

		let newEvent = {
			title: this.state.title,
			description: this.state.description,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			location: this.state.location,
			geo: this.state.geo,
			categories: this.state.categories,
			color: this.state.color,
			isPublic: this.state.isPublic,
			organizer: this.state.organizer,
			attendees: this.state.attendees,
			url: this.state.url,
		};

		if (this.state.title != '')
			events.addEvent(
				newEvent,
				this.props.username,
				this.props.date,
				this.props.provider
			);
		this.props.callback();
	};

	handleCancel = (event) => {
		this.props.callback();
	};

	render() {
		return (
			<a className='list-group-item list-group-item-action'>
				<p style={{ color: 'red' }}>{this.state.error}</p>
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
						<span className='form-text'>Set start & end time.</span>
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
					<div className='mt-4'>
						<span className='form-text'>Set location and geo</span>
						<input
							className='form-control form-control-sm'
							type='text'
							name='location'
							placeholder='location'
							onChange={this.handleChange}
						/>
						<input
							className='form-control form-control-sm  mt-2'
							type='text'
							name='geo'
							placeholder='geo'
							onChange={this.handleChange}
						/>
					</div>
					<div className=' mt-4'>
						<span className='form-text'>Set catergories</span>
						<input
							className='form-control'
							type='text'
							name='flare'
							placeholder='work, school, family'
							onChange={this.handleChange}
						/>
						<span className='form-text'>Set color.</span>
						<input
							className='form-control mt-2'
							type='color'
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
					<div className='mt-4'>
						<span className='form-text'>Set organizer and attendees</span>
						<input
							className='form-control form-control-sm'
							type='text'
							name='organizer'
							placeholder='organizer'
							onChange={this.handleChange}
						/>
						<input
							className='form-control form-control-sm  mt-2'
							type='text'
							name='attendees'
							placeholder='attendees'
							onChange={this.handleChange}
						/>
					</div>
					<div className='mt-4'>
						<span className='form-text'>Set URL</span>
						<input
							className='form-control form-control-sm'
							type='url'
							name='url'
							placeholder='url'
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
