import React from 'react';
import { signIn } from 'next-auth/client';
import { getActive } from '@helper/getNavbarActive';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container text-center mt-4'>
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
							aria-label='Toggle navigation'
						>
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
									aria-disabled='true'
								>
									Placeholder
								</a>
							</div>
						</div>
					</div>
				</nav>
				{Object.entries(entries.props.navs).map((nav) => {
					const [name, path] = nav;
					<Link href={path}>
						<a className='nav-link'>{name}</a>
					</Link>;
				})}
			</div>
		);
	}
}

export default Navbar;
