import React from 'react';
import { loadNextEvents } from '@/helper/eventList/getNextEvents';
import { getDayDeltaText } from '@/helper/eventList/getDayDelta';
import Link from 'next/link';
import { parseISO } from 'date-fns';

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listEvents: [],
			loading: true,
		};
	}

	componentDidMount() {
		this.getEvents();
	}
	async getEvents() {
		let events = await loadNextEvents(
			this.props.days,
			new Date(),
			this.props.amount,
			this.props.session?.databaseId || this.props.session?.user.name,
			this.props.session?.provider
		);
		console.log(events);
		this.setState({ listEvents: events, loading: false });
	}
	render() {
		return (
			<div>
				<div className='container mt-4'>
					<div className='card border mb-3 redLine'>
						<div className='card-header bborder'>Your Tasks</div>
						<div className='card-body text-dark'>
							<div className='list-group'>
								{this.state.loading ? (
									<div className='loader container'></div>
								) : (
									<></>
								)}
								{this.state.listEvents.length ? (
									this.state.listEvents.map((item) => (
										<div
											key={item.id}
											className='list-group-item list-group-item-action'
											aria-current='true'>
											<div className='d-flex w-100 justify-content-between'>
												<h5 className='mb-1'>{item.title}</h5>
												<small>
													{getDayDeltaText(new Date(), parseISO(item.start))}
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
										</div>
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
