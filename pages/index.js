import { signIn, signOut, useSession } from 'next-auth/react';
import Loader from '@/components/loader';
import Link from 'next/link';

export default function Page() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Loader />;
	}
	return (
		<div className='container mt-4'>
			<h1>Getting Started</h1>
			<br />
			<p>
				<br />
				<br />
				Next.js is a React framework that enables several extra features,
				including server-side rendering and generating static websites. React is
				a JavaScript library that is traditionally used to build web
				applications rendered in the client&apos;s browser with JavaScript.{' '}
				<br />
				The code is available on{' '}
				<a href='https://github.com/SchuBiNo'>GitHub</a>
				.
				<br />
				<br />
			</p>
			<h2>Login</h2>
			<br />
			<p>
				To start using the test page, you must first log in.
				<br />
				Currently, 3 providers are implemented in the test page.
				<br />
				<br />
				<p className='fs-4'>Custom Credential Provider:</p>
				Registration of new accounts using the Credential Provider is currently
				disabled, to login with the Credential Provider please use the following
				account.
				<br />
				This account support persistent data storage. Events are stored in the
				database.
				<br />
				<br />
				<code>
					Username:&nbsp;User
					<br />
					Email: User@email.de
					<br />
					Password: UserPassword
				</code>
				<br />
				<br />
				<br />
				<p className='fs-4'>GitHub Credential Provider:</p>
				To log in with GitHub, you only need to grant the app access to the
				necessary information of your GitHub account.
				<br />
				<br />
				<br />
				<br />
				<p className='fs-4'>Google Credential Provider:</p>
				To log in with Google, you only need to grant the app access to the
				necessary information of your Google account. Google Credential Provider
				might not work because of missing redirects.
			</p>
			<br />
			<div className='text-center mt-4'>
				{session ? (
					<>
						Signed in as {session.user.name} <br />
						<button
							className='btn btn-secondary mt-2'
							onClick={() => signOut()}>
							Sign out
						</button>
					</>
				) : (
					<>
						Not signed in <br />
						<button
							className='btn btn-primary mt-2'
							onClick={() => {
								signIn();
							}}>
							Sign in
						</button>
						<br />
						or
						<br />
						<Link href='/auth/signup' passHref>
							<button className='btn btn-primary mt-2'>Sign up</button>
						</Link>
					</>
				)}
			</div>
			<br />
			<h1>API</h1>
			<br />
			<p>
				<p className='fs-4'>Get UserID</p>
				The userID can be obtained by sending a &quot;GET&quot; request to the
				&nbsp;
				<code>/api/user/[name]/id</code> route, where &nbsp;<code>[name]</code>
				&nbsp; is the username of the user whose userID you want to request.
				<br />
				<br />
				<p className='fs-4'>Add Event to Database</p>
				Events can be added to the database by sending a &quot;POST&quot;
				request to the <code>/api/calendar/add</code> route.
				<br />
				The body of the request must contain valid JSON data.
				<br /> The body has to include the userId of type <code>String</code>,
				the date of type <code>Date</code> and events of type <code>Array</code>
				.
				<br />
				<br />
				<p className='fs-4'>Get Events from Database</p>To retrieve events from
				the database, send a &quot;POST&quot; request to the{' '}
				<code>/api/calendar/get</code> route.
				<br />
				This API route currently uses &quot;POST&quot; requests when it should
				be a &quot;GET&quot; request, the reason for this is that
				&quot;GET&quot; requests do not support a JSON body and request
				parameters are not suitable for this type of request.
				<br />
				<br />
				The body of the request must contain valid JSON data.
				<br /> The body has to include the userId and dates of type{' '}
				<code>Date</code> or <code>Array</code>.
				<br />
				The API will return all events for the requested dates.
				<br />
				<br />
				<p className='fs-4'>Delete Event from Database</p>To delete an event
				from the database, send a &quot;DELETE&quot; request to the{' '}
				<code>/api/calendar/delete</code> route.
				<br />
				<br />
				The body of the request must contain valid JSON data.
				<br /> The body has to include the userId, date and the eventId.
				<br />
				<br />
				<br />
				<br />
			</p>
		</div>
	);
}
