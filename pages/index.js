import { signIn, signOut, useSession } from 'next-auth/react';
import AccessDenied from '@/components/accessDenied';
import Loader from '@/components/loader';
import Image from 'next/image';
import logo from '@/public/SchuBiNoNavBar.png';

const MyLogo = (props) => {
	return <Image src={logo} layout='responsive' alt='Logo' />;
};

export default function Page() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Loader />;
	}
	return (
		<div className='container mt-4'>
			<div className='logo'>
				<MyLogo />
			</div>
			<div className='index mt50'>
				<div className='indexText'>
					<p>
						„Lorem ipsum dolor sit amet, consectetur adipisici elit, …“ ist ein
						Blindtext, der nichts bedeuten soll, sondern als Platzhalter im
						Layout verwendet wird, um einen Eindruck vom fertigen Dokument zu
						erhalten. Die Verteilung der Buchstaben und der Wortlängen des
						pseudo-lateinischen Textes entspricht in etwa der natürlichen
						lateinischen Sprache. Der Text ist absichtlich unverständlich, damit
						der Betrachter nicht durch den Inhalt abgelenkt wird.{' '}
					</p>
				</div>
				<div className='indexLogin'>{session ? <></> : <AccessDenied />}</div>

				{session ? (
					<div className='container'>
						<button className='btn btn-primary' onClick={() => signOut()}>
							SignOut
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
