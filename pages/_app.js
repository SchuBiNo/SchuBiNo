// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<header>
				<nav className='navbar navbar-expand-lg navbar-light bg-light'>
					<div className='container-fluid'>
						<Link href='/'>
							<a className='navbar-brand'>NextPlanner</a>
						</Link>

						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarNavAltMarkup'
							aria-controls='navbarNavAltMarkup'
							aria-expanded='false'
							aria-label='Toggle navigation'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
							<div className='navbar-nav'>
								<Link href='/dashboard'>
									<a className='nav-link active' aria-current='page'>
										Dashboard
									</a>
								</Link>
								<Link href='/calendar'>
									<a className='nav-link'>Planner</a>
								</Link>
								<Link href='/grades'>
									<a className='nav-link'>Grades</a>
								</Link>
								<a
									className='nav-link disabled'
									href='#'
									tabIndex='-1'
									aria-disabled='true'>
									Placeholder
								</a>
							</div>
						</div>
					</div>
				</nav>
			</header>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
