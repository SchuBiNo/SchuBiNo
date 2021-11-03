import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
	format,
	addMonths,
	getMinutes,
	getHours,
	parseISO,
	addMilliseconds,
} from 'date-fns';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import buildCalendar from '@/helper/calendar/buildCalender';
import dayStyles from '@/helper/calendar/styleCalendar';
import events from '@/helper/calendar/events';

import EventForm from '@/components/eventForm';
import AccessDenied from '@/components/accessDenied';

export default function Calender() {
	const router = useRouter();
	const [calendar, setCalendar] = useState([]);
	const [value, setValue] = useState(
		router.query.date ? parseISO(router.query.date) : new Date()
	);
	const [hasEventForm, setEventForm] = useState(false);
	const [session, loading] = useSession();

	useEffect(() => {
		setCalendar(buildCalendar(value));
	}, [value]);

	function showEventForm() {
		if (hasEventForm)
			return (
				<EventForm
					date={value}
					username={session.user.name}
					callback={() => eventFormCallback()}
				/>
			);
		else return '';
	}

	function eventFormCallback() {
		setEventForm(false);
	}
	const refresh = () => {
		//workaround because you it doesn't update when the same value is set
		setValue(addMilliseconds(value, 1));
	};

	return (
		<>
			{session ? (
				<div>
					<div className='container mt-4'>
						<div className='card'>
							<div className='card-header text-center'>
								<button
									className='btn'
									onClick={() => {
										setValue(addMonths(value, -1));
									}}>
									⬅
								</button>
								{format(value, 'MMMM-yyyy')}
								<button
									className='btn'
									onClick={() => {
										setValue(addMonths(value, 1));
									}}>
									➡
								</button>
							</div>
							<div className='card-body'>
								{calendar.map((week) => (
									<div className='row'>
										{week.map((day) => (
											<div
												onClick={() => setValue(day)}
												className={`col card ${dayStyles(day, value)} `}>
												<div className='card-body text-center fw-bold'>
													{format(day, 'dd-MM')}
													<span> </span>
													{events.dateHasEvents(day) ? (
														<span className='badge rounded-pill bg-primary'>
															📑
														</span>
													) : (
														''
													)}
												</div>
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='container mt-4'>
						<div className='list-group'>
							{events
								.getEventsForDate(value, session?.user.name, refresh)
								?.map((cEvent) => (
									<a
										href='#'
										className='list-group-item list-group-item-action'>
										<div className='d-flex w-100 justify-content-between'>
											<h5 className='mb-1'>{cEvent.title}</h5>
											<small>
												{getHours(parseISO(cEvent.date))}:
												{getMinutes(parseISO(cEvent.date))}
											</small>
										</div>
										<p className='mb-1'>{cEvent.description}</p>
										<p>
											<span className='badge bg-primary rounded-pill'>
												{cEvent.flare}
											</span>
										</p>
										<small>
											edit |{' '}
											<a
												onClick={() => {
													events.deleteEvent(
														value,
														session?.user.name,
														cEvent.id,
														refresh
													);
												}}>
												delete
											</a>
										</small>
									</a>
								)) ?? <a>Nothing to do</a>}
							{showEventForm()}
						</div>
						<div className='d-grid gap-2 d-md-flex justify-content-md-end mt-3'>
							<button
								className='btn btn-primary me-md-2'
								type='button'
								onClick={() => setEventForm(true)}>
								+
							</button>
						</div>
					</div>
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
