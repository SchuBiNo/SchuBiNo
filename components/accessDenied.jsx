import React from 'react';
import { signIn } from 'next-auth/client';

class AccessDenied extends React.Component {
	render() {
		return (
			<div className='container text-center mt-4'>
				<>
					You need to be signed in to access this page!🔒
					<br />
					<div className='d-grid gap-2 col-4 mx-auto'>
						<button className='btn btn-primary mt-3' onClick={() => signIn()}>
							Sign in
						</button>
					</div>
				</>
			</div>
		);
	}
}

export default AccessDenied;
