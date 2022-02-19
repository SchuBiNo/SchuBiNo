import {
	signIn,
	getProviders,
	useSession,
	getCsrfToken,
} from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import loader from '@/components/loader.jsx';

export default function SignIn({ csrfToken }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const [providers, setProviders] = useState([]);

	useEffect(() => {
		getProviders().then((value) => setProviders(value));
	}, []);

	const handleChange = (event) => {
		setCredentials({ [event.target.name]: event.target.value });
	};
	if (status === 'loading') {
		return <loader />;
	}
	return (
		<div>
			{console.log(providers)}
			<a className='text-danger'>
				{router.query.error && <SignInError error={router.query.error} />}
			</a>
			<form
				className='mb-4 mt-4'
				method='post'
				action='/api/auth/callback/credentials'>
				<div className='form-group'>
					<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
					<label htmlFor='Email'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						required
						className='form-control'
						onChange={handleChange}></input>
				</div>
				<div className='form-group'>
					<label htmlFor='Password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						required
						className='form-control'
						onChange={handleChange}></input>
				</div>
				<button className='btn btn-primary mt-3 form-control' type='submit'>
					Signin
				</button>
			</form>
			{providers?.github && (
				<div>
					<hr></hr>
					<button
						type='button'
						className='btn btn-primary form-control mt-2 mb-2'
						onClick={() => signIn(providers?.github.id)}>
						GitHub Login
					</button>
				</div>
			)}
			{providers?.google && (
				<div>
					<hr></hr>
					<button
						type='button'
						className='btn btn-primary form-control mt-2'
						onClick={() => signIn(providers?.google.id)}>
						Google Login
					</button>
				</div>
			)}
		</div>
	);
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}

const errors = {
	Signin: 'Try signing with a different account.',
	OAuthSignin: 'Try signing with a different account.',
	OAuthCallback: 'Try signing with a different account.',
	OAuthCreateAccount: 'Try signing with a different account.',
	EmailCreateAccount: 'Try signing with a different account.',
	Callback: 'Try signing with a different account.',
	OAuthAccountNotLinked:
		'To confirm your identity, sign in with the same account you used originally.',
	EmailSignin: 'Check your email address.',
	CredentialsSignin:
		'Sign in failed. Check the details you provided are correct.',
	default: 'Unable to sign in.',
};
const SignInError = ({ error }) => {
	const errorMessage = error && (errors[error] ?? errors.default);
	return <div>{errorMessage}</div>;
};
