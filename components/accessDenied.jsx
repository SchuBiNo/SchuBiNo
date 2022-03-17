import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

class AccessDenied extends React.Component {
	render() {
		return (
			<div className='container text-center mt-4'>
				<>
					You need to be signed in to access this page!🔒
					<br />
					<div className='d-grid gap-2 col-4 mx-auto'>
						<button className='btn btn-secondary mt-3' onClick={() => signIn()}>
							Sign in
						</button>
						<Link href='/auth/signup'>
							<button className='btn btn-secondary mt-3'>Sign up</button>
						</Link>
					</div>
				</>
			</div>
		);
	}
}

export default AccessDenied;
