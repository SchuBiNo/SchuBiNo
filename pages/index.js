import { signIn, signOut, useSession } from 'next-auth/react';
import AccessDenied from '@/components/accessDenied';
import Loader from '@/components/loader';
import Image from 'next/image';
import logo from '@/public/SchuBiNoNavBar.png';

const MyLogo = (props) => {
	return <Image src={logo} layout='responsive' alt='Logo' />;
};

export default function Page() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Loader />;
	}
	return (
		<div className='container mt-4'>
			<div className='logo'>
				<MyLogo />
			</div>
			<div className='index mt50'>
				<div className='indexText'>
					<p>
						This is your planner. Please sign up to start your schedule. If you
						are already signed up, sign in to access your schedule.{' '}
					</p>
				</div>
				<div className='indexLogin'>{session ? <></> : <AccessDenied />}</div>

				{session ? (
					<div className='container'>
						<button className='btn btn-primary' onClick={() => signOut()}>
							SignOut
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
