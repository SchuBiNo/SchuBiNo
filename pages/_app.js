import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '@/components/navBar';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const path = typeof window !== 'undefined' ? window.location.pathname : '/';
	return (
		<>
			<SessionProvider session={session}>
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
							Notes: '/notes',
							Grades: '/grades',
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
