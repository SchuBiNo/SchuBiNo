import { signIn, signOut, useSession } from 'next-auth/client';

export default function Page() {
	const [session, loading] = useSession();

	return (
		<div className='container mt-4'>
			<h1>Getting Started</h1>
			<br />
			<p>
				Welcome to the Next.js test page!
				<br />
				<br />
				Next. js is a React framework that enables several extra features,
				including server-side rendering and generating static websites. React is
				a JavaScript library that is traditionally used to build web
				applications rendered in the client's browser with JavaScript. <br />
				The code is available at <a href='#'>GitHub</a>.
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
					Username:&nbsp;Guest
					<br />
					Email: guest@email.de
					<br />
					Password: 76UHPnVX
				</code>
				<br />
				<br />
				<br />
				<p className='fs-4'>GitHub Credential Provider:</p>
				To log in with GitHub, you only need to grant the app access to the
				necessary information of your GitHub account.
				<br />
				GitHub accounts might not support persistent data storage at the moment,
				due to a bug with mongoose.
				<br />
				<br />
				<br />
				<p className='fs-4'>Google Credential Provider:</p>
				This provider is currently disabled due to missing API keys.
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
						<button className='btn btn-primary mt-2' onClick={() => signIn()}>
							Sign in
						</button>
					</>
				)}
			</div>
			<br />
			<h1>API</h1>
			<br />
			<p>
				<p className='fs-4'>Get UserID</p>
				The userID can be obtained by sending a "GET" request to the &nbsp;
				<code>/api/user/[name]/id</code> route, where &nbsp;<code>[name]</code>
				&nbsp; is the username of the user whose userID you want to request.
				<br />
				<br />
				<p className='fs-4'>Add Event to Database</p>
				Events can be added to the database by sending a "POST" request to the{' '}
				<code>/api/calendar/add</code> route.
				<br />
				The body of the request must contain valid JSON data.
				<br /> The body has to include the userId of type <code>String</code>,
				the date of type <code>Date</code> and events of type <code>Array</code>
				.
				<br />
				<br />
				<p className='fs-4'>Get Events from Database</p>To retrieve events from
				the database, send a "POST" request to the{' '}
				<code>/api/calendar/get</code> route.
				<br />
				This API route currently uses "POST" requests when it should be a "GET"
				request, the reason for this is that "GET" requests do not support a
				JSON body and request parameters are not suitable for this type of
				request.
				<br />
				<br />
				The body of the request must contain valid JSON data.
				<br /> The body has to include the userId and dates of type{' '}
				<code>Date</code> or <code>Array</code>.
				<br />
				The API will return all events for the requested dates.
			</p>
		</div>
	);
}
