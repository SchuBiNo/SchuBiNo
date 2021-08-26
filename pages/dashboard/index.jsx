import Link from 'next/link';
import EventList from '../../components/eventList';

export default function Dashboard() {
	return <EventList days={7} amount={5} />;
}
