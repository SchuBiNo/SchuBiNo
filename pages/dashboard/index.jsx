import Link from 'next/link';
import EventList from '@/components/eventList';
import AccessDenied from '@/components/accessDenied';

import { useSession } from 'next-auth/client';

export default function Dashboard() {
	const [session, loading] = useSession();

	return <>{session ? <EventList days={7} amount={5} /> : <AccessDenied />}</>;
}