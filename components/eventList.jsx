import React from 'react';
import { loadNextEvents } from '@/helper/eventList/getNextEvents';
import { getDayDeltaText } from '@/helper/eventList/getDayDelta';
import Link from 'next/link';
import { parseISO } from 'date-fns';

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
											key={item.id}
											className='list-group-item list-group-item-action'
											aria-current='true'>
											<div className='d-flex w-100 justify-content-between'>
												<h5 className='mb-1'>{item.title}</h5>
												<small>
													{getDayDeltaText(new Date(), parseISO(item.date))}
												</small>
											</div>
											<p className='mb-1'>{item.description}</p>
											<Link
												href={{
													pathname: '/calendar',
													query: { date: item.date },
												}}>
												<a>
													<small>Go to task</small>
												</a>
											</Link>
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
