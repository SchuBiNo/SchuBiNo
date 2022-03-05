import React from 'react';
import { getActive } from '@/helper/navbar/getNavbarActive';
import Link from 'next/link';
class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container text-center mt-4'>
				<nav className='navbar navbar-expand-lg navbar-light bgr'>
					<div className='container-fluid'>
						<Link href='/'>
							<a className='navbar-brand'>SchuBiNo</a>
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
							<div className='navbar-nav mx-auto d-flex'>
								<ul className='navbar-nav mx-auto d-flex'>
									{Object.entries(this.props.navs).map((nav) => (
										<li className='nav-item' key={nav[0]}>
											<Link href={nav[1]}>
												<a
													className={`nav-link ${getActive(
														this.props.path,
														nav[1]
													)}`}>
													{nav[0]}
												</a>
											</Link>
										</li>
									))}
								</ul>

							</div>
							<form class='form-inline my-2 my-lg-0'>
								<button
									class='btn btn-outline my-2 my-sm-0 ms-auto d-flex butred'
									type='submit'>
									Search
								</button>
							</form>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
