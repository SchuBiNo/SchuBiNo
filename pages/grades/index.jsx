import AccessDenied from '@/components/accessDenied';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AddSubjectForm from '@/components/addSubjectForm';
import AddSubjectTypeForm from '@/components/addSubjectTypeForm';
import { nanoid } from 'nanoid';

export default function Dashboard() {
	const { data: session, status } = useSession();
	const [curSubject, setCurSubject] = useState();
	const [subjects, setSubjects] = useState([
		{
			id: nanoid(),
			title: 'Math',
			types: [
				{
					id: nanoid(8),
					name: 'oral grades',
					percentage: 50,
					grades: [3, 2, 3],
				},
				{
					id: nanoid(8),
					name: 'exams',
					percentage: 30,
					grades: [3],
				},
			],
		},
	]);
	const [error, setError] = useState('');
	const [hasSubjectForm, setSubjectForm] = useState(false);
	const [hasSubjectTypeForm, setSubjectTypeForm] = useState(false);

	function setActiveSubject(subject) {
		setCurSubject(subject);
	}

	function addSubject(data) {
		setSubjectForm(false);
		if (data) {
			let newSubject = {
				id: nanoid(8),
				title: data.title,
				types: [],
			};
			setSubjects([...subjects, newSubject]);
		}
	}

	function showSubjectForm() {
		if (hasSubjectForm)
			return <AddSubjectForm callback={(value) => addSubject(value)} />;
		else return '';
	}

	function showSubjectTypeForm() {
		if (hasSubjectTypeForm && curSubject)
			return (
				<AddSubjectTypeForm
					callback={(value) => addSubjectType(value)}
					subjectId={curSubject.id}
				/>
			);
		else return '';
	}

	function getSubjectAverage(subject) {
		let setSubject = subject ? subject : curSubject;
		if (setSubject) {
			let mark = 0;
			setSubject.types.forEach((type) => {
				const sum = type.grades.reduce((a, b) => a + b, 0);
				console.log(sum);
				const avg = sum / type.grades.length || 0;
				mark += avg * (type.percentage / 100);
			});
			return Math.round(mark * 100) / 100;
		}
		return 0;
	}

	function addSubjectType(data) {
		setSubjectTypeForm(false);
		if (data) {
			console.log(data);
			let newType = {
				id: nanoid(8),
				name: data.name,
				percentage: data.percentage,
				grades: [],
			};
			let tempSubjects = subjects;
			let subjectIndex = tempSubjects.findIndex(
				(subject) => subject.id === data.id
			);

			let curPercentage = 0; //reduce not working
			tempSubjects[subjectIndex].types.forEach((type) => {
				curPercentage += type.percentage;
			});

			console.log(curPercentage + newType.percentage);
			if (curPercentage + newType.percentage <= 100) {
				tempSubjects[subjectIndex].types.push(newType);
			} else {
				setError('Total percentage of subject types is more than 100%');
			}

			setSubjects(tempSubjects);
			setCurSubject(tempSubjects[subjectIndex]);
		}
	}

	function addGrade(subjectId, typeId, grade) {
		let tempSubjects = subjects;
		let subjectIndex = tempSubjects.findIndex(
			(subject) => subject.id === subjectId
		);
		let typeIndex = tempSubject[subjectIndex].types.findIndex(
			(type) => typeId === type.id
		);
		tempSubjects[subjectIndex].types[typeIndex].grades.push(grade);
		setSubjects(tempSubjects);
		setCurSubject(tempSubjects[subjectIndex]);
	}

	function showError() {
		return <div>{error}</div>;
	}

	if (status === 'loading') {
		return <loader />;
	}
	return (
		<>
			{session ? (
				<div>
					<div className='fs-1 text text-center mt-4'>{showError}</div>
					<div className='fs-1 mt-4 container'>
						<div className='row'>
							<div className='col-md-6 text text-center'>
								<table className='table table-hover'>
									<thead>
										<tr>
											<th scope='col'>Subject</th>
											<th scope='col'>average</th>
										</tr>
									</thead>
									<tbody>
										{subjects.map((subject) => (
											<tr onClick={() => setActiveSubject(subject)}>
												<td>{subject?.title}</td>
												<td>{getSubjectAverage(subject)}</td>
											</tr>
										))}
									</tbody>
								</table>
								<button
									className='btn btn-primary form-control'
									onClick={() => {
										setSubjectForm(true);
									}}>
									+
								</button>
								{showSubjectForm()}
							</div>
							<div className='col-md-6 table-responsive'>
								<table className='table'>
									<thead className='text text-center'>
										<tr>
											<th scope='col'>{curSubject?.title}</th>
										</tr>
									</thead>
									<tbody className='align-top'>
										{curSubject?.types.map((type, index) => (
											<tr key={index} className='row'>
												{console.log(type)}
												<div>
													{type.name}: {type?.percentage}%
												</div>
												<div className='col'>
													{type.grades.join(', ')}{' '}
													<button className='col btn btn-primary btn-sm'>
														+
													</button>
												</div>
											</tr>
										))}
									</tbody>
								</table>
								{curSubject ? (
									<>
										<div>Total: {getSubjectAverage()}</div>
										<button
											className='btn btn-primary form-control'
											onClick={() => {
												setSubjectTypeForm(true);
											}}>
											+
										</button>
										{showSubjectTypeForm()}
									</>
								) : (
									<></>
								)}
							</div>
							<div className='row'>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
								at quam reiciendis, cumque recusandae totam unde dolore! Illum
								omnis facere dolores assumenda unde saepe asperiores nesciunt,
								quia, quas quos soluta.
							</div>
						</div>
					</div>
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
