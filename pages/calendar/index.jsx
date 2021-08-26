import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { format, getISODay, startOfMonth } from 'date-fns';

import buildCalendar from './build';
import dayStyles from './styles';
import { loadEvents, addEvent, hasEvents } from './calEvents';

export default function Calender() {
	const [calendar, setCalendar] = useState([]);
	const [value, setValue] = useState(new Date());
	const [dateEvents, setEvents] = useState({});

	useEffect(() => {
		setCalendar(buildCalendar(value));
	}, [value]);

	return (
		<div>
			<div className='container mt-4'>
				{calendar.map((week) => (
					<div className='row'>
						{week.map((day) => (
							<div
								onClick={() => setValue(day)}
								className={`col card ${dayStyles(day, value)} `}>
								<div className='card-body text-center fw-bold'>
									{format(day, 'dd-MM')}
									<span> </span>
									{hasEvents(day, dateEvents)}
								</div>
							</div>
						))}
					</div>
				))}
			</div>

			<div className='container mt-4'>
				<div className='list-group'>
					{loadEvents(value, dateEvents)?.map((cEvent) => (
						<a href='#' className='list-group-item list-group-item-action'>
							<div className='d-flex w-100 justify-content-between'>
								<h5 className='mb-1'>{cEvent.title}</h5>
								<small>Text</small>
							</div>
							<p className='mb-1'>{cEvent.description}</p>
							<small>edit | remove</small>
						</a>
					)) ?? <a>Nothing to do</a>}
				</div>
				<div className='d-grid gap-2 d-md-flex justify-content-md-end mt-3'>
					<button
						className='btn btn-primary me-md-2'
						type='button'
						onClick={() =>
							setEvents(addEvent(value, dateEvents, 'Test', 'Description📖'))
						}>
						+
					</button>
					<button className='btn btn-primary' type='button'>
						/--/
					</button>
				</div>
			</div>
		</div>
	);
}
