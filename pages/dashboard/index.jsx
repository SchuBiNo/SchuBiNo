import EventList from '@/components/eventList';
import AccessDenied from '@/components/accessDenied';
import Loader from '@/components/loader';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Loader />;
	}
	return (
		<>
			{session ? (
				<div>
					<div className='fs-1 text text-center mt-4'>
						Welcome back {session?.user.name}!
					</div>

					<EventList days={7} amount={5} session={session}/>
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
