import { signIn, signOut, useSession } from 'next-auth/client';

export default function Page() {
	const [session, loading] = useSession();

	return (
		<div className='container text-center mt-4'>
			{!session && (
				<>
					Not signed in <br />
					<button className='btn btn-primary' onClick={() => signIn()}>
						Sign in
					</button>
				</>
			)}
			{session && (
				<>
					Signed in as {session.user.name} <br />
					<button className='btn btn-secondary' onClick={() => signOut()}>
						Sign out
					</button>
				</>
			)}
		</div>
	);
}
