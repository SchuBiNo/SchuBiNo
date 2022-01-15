import Link from 'next/link';
import EventList from '@/components/eventList';
import AccessDenied from '@/components/accessDenied';

import { useSession } from 'next-auth/client';

export default function Welcome() {
	const [session, loading] = useSession();

	if (loading) {
		return <div className='loader container'></div>;
	}
	return (
		<>
			{session ? (
				<div>
					<div className='fs-1 text text-center mt-4'>
						Welcome {session?.user.name}!
					</div>
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
