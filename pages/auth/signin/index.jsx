import {
	useSession,
	getProviders,
	signIn,
	signOut,
	getCsrfToken,
} from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SignInForm from '@/components/signinForm';

export default function SignIn({ csrfToken }) {
	const [session, loading] = useSession();
	const router = useRouter();

	function signinFormCallback() {}

	function autoRedirect() {
		setTimeout(() => router.push('/dashboard'), 5000);
	}

	if (loading) {
		return <div className='loader container'></div>;
	}
	return (
		<>
			{session ? (
				<div>
					<div className='text text-center mt-4 container'>
						<h1>You are already logged in!</h1>
						<p>
							You will be automatically redirected in 5 seconds or
							<a href='/dashboard'> Click here</a>!
						</p>
						{autoRedirect()}
					</div>
				</div>
			) : (
				<div className='container'>
					<SignInForm
						callback={signinFormCallback}
						csrfToken={csrfToken}
						error={router.query.error}
					/>
				</div>
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
