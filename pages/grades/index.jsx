import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Tree from '@/helper/tree';

import AccessDenied from '@/components/accessDenied';

import { useSession } from 'next-auth/client';

export default function grades() {
	const [session, loading] = useSession();
	const [gradeTree, setGradeTree] = useState(new Tree('finalGrade'));

	gradeTree.print();
	console.log(gradeTree.descendats);

	return (
		<>
			{session ? (
				<div className='container'>
					<Dropdown>
						<Dropdown.Toggle variant='secondary' id='dropdown-basic'>
							{gradeTree.name}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href='#/action-1'>Set Weight</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									console.log('hey');
									gradeTree.createChildNode('Klausur');
									gradeTree.print();
									setGradeTree(gradeTree);
								}}>
								Add Child
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					{gradeTree.descendats.map((node) => (
						<div>
							<Dropdown>
								<Dropdown.Toggle variant='secondary' id='dropdown-basic'>
									{node.name}
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item href='#/action-1'>Set Weight</Dropdown.Item>
									<Dropdown.Item
										onClick={() => {
											node.createChildNode('Klausur');
											setGradeTree(gradeTree);
										}}>
										Add Child
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					))}
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
