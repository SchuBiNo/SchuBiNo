// add bootstrap css
import Head from 'next/head';
import Navbar from '@/components/navBar';
import '../styles/globals.css';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, session, ...pageProps }) {
	const path = typeof window !== 'undefined' ? window.location.pathname : '/';

	return (
		<>
			<SessionProvider session={session}>
				<Head>
					<link
						href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
						rel='stylesheet'
						integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
						crossOrigin='anonymous'></link>

					<meta name='viewport' content='width=device-width, initial-scale=1' />
				</Head>
				<Script
					src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
					integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p'
					crossOrigin='anonymous'
				/>
				<header>
					<Navbar
						navs={{
							Dashboard: '/dashboard',
							Planner: '/calendar',
							Todo: '/todo',
						}}
						path={path}
					/>
				</header>

				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}

export default MyApp;
