import React from 'react';
import { loadNextEvents } from '../helper/getNextEvents';
import { getDayDelta } from '../helper/getDayDelta';
import Link from 'next/link';

class EventList extends React.Component {
	render() {
		this.listEvents = loadNextEvents(
			this.props.days,
			new Date(),
			this.props.amount
		);
		console.log(this.listEvents);
		return (
			<div>
				<div className='container mt-4'>
					<div className='list-group'>
						{this.listEvents.map((item) => (
							<a
								className='list-group-item list-group-item-action'
								aria-current='true'>
								<div className='d-flex w-100 justify-content-between'>
									<h5 className='mb-1'>{item.title}</h5>
									<small>{getDayDelta(new Date(), item.date, false)}</small>
								</div>
								<p className='mb-1'>{item.description}</p>
								<small>Go to task</small>
							</a>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default EventList;
