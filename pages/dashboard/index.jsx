import Link from 'next/link';

export default function Dashboard() {
	return (
		<div>
			<div className='container mt-4'>
				<div className='list-group'>
					<Link href='#'>
						<a
							className='list-group-item list-group-item-action'
							aria-current='true'>
							<div className='d-flex w-100 justify-content-between'>
								<h5 className='mb-1'>Your homework</h5>
								<small>Today</small>
							</div>
							<p className='mb-1'>Some placeholder content in a paragraph.</p>
							<small>Go to task</small>
						</a>
					</Link>
					<Link href='#'>
						<a className='list-group-item list-group-item-action'>
							<div className='d-flex w-100 justify-content-between'>
								<h5 className='mb-1'>List group item heading</h5>
								<small className='text-muted'>Tomorrow</small>
							</div>
							<p className='mb-1'>Some placeholder content in a paragraph.</p>
							<small className='text-muted'>Go to task</small>
						</a>
					</Link>
					<Link href='#'>
						<a className='list-group-item list-group-item-action'>
							<div className='d-flex w-100 justify-content-between'>
								<h5 className='mb-1'>List group item heading</h5>
								<small className='text-muted'>In 3 days</small>
							</div>
							<p className='mb-1'>Some placeholder content in a paragraph.</p>
							<small className='text-muted'>Go to task</small>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
