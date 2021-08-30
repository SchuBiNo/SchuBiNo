import React from 'react';
import { loadNextEvents } from '@/helper/eventList/getNextEvents';
import { getDayDelta } from '@/helper/eventList/getDayDelta';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.listEvents = loadNextEvents(
			this.props.days,
			new Date(),
			this.props.amount
		);
	}
	render() {
		console.log(this.listEvents);
		return (
			<div>
				<div className='container mt-4'>
					<div className='card border-secondary mb-3'>
						<div className='card-header'>Your Tasks</div>
						<div className='card-body text-dark'>
							<div className='list-group'>
								{this.listEvents.length ? (
									this.listEvents.map((item) => (
										<a
											className='list-group-item list-group-item-action'
											aria-current='true'>
											<div className='d-flex w-100 justify-content-between'>
												<h5 className='mb-1'>{item.title}</h5>
												<small>
													{getDayDelta(new Date(), item.date, false)}
												</small>
											</div>
											<p className='mb-1'>{item.description}</p>
											<small>Go to task</small>
										</a>
									))
								) : (
									<p className='card-text'>
										Your upcoming tasks will be displayed here. <br></br> Add
										some in the planner to get started.
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EventList;
