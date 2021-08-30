// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Navbar from '@/components/navBar';
import '../styles/globals.css';
import Link from 'next/link';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
	const path = typeof window !== 'undefined' ? window.location.pathname : '/';

	return (
		<Provider session={pageProps.session}>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<header>
				<Navbar
					navs={{
						Dashboard: '/dashboard',
						Planner: '/calendar',
					}}
					path={path}
				/>
			</header>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
