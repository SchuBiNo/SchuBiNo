import SignUpForm from '@/components/signupForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

export default function SignUp() {
	const [session, loading] = useSession();
	const router = useRouter();

	function signupFormCallback() {}

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
					<SignUpForm callback={() => signupFormCallback()} />

					<a href='/api/auth/signin' class='alert-link btn btn-primary btn-sm'>
						Login
					</a>
				</div>
			)}
		</>
	);
}
