import AccessDenied from '@/components/accessDenied';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TextEditor from '@/components/textEditor';
import Loader from '@/components/loader';

export default function Dashboard() {
	const { data: session, status } = useSession();
	if (status === 'loading') {
		return <Loader />;
	}
	return (
		<>
			{session ? (
				<div className='container'>
					<div className='fs-1 text text-center mt-4'>Notes (experimental)</div>
					<p>
						This notes section is experimental. It is not meant to be used for
						anything other than testing.<br></br> There are no UI Elements yet.
						<br></br> But you can use common keyboard shortcuts to format your
						text.
						<br></br>
					</p>
					<div className='fs-1 text text-center mt-4 container'>
						<TextEditor />
					</div>
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
