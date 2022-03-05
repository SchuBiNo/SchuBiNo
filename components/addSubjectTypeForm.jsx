import React from 'react';

class AddSubjectTypeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			percentage: '',
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { name, percentage } = this.state;
		this.props.callback({
			id: this.props.subjectId,
			name: name,
			percentage: parseInt(percentage),
		});
	};

	handleCancel = (event) => {
		this.props.callback();
	};

	render() {
		return (
			<a className='list-group-item list-group-item-action redLine mb'>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							className='form-control mt-2'
							type='text'
							name='name'
							required
							placeholder='Name'
							onChange={this.handleChange}
						/>
					</div>
					<div className='mt-3'>
						<input
							className='form-control form-control-sm'
							type='number'
							name='percentage'
							placeholder='Percentage'
							required
							min={0}
							max={100}
							onChange={this.handleChange}
						/>
					</div>
					<button className='btn bgdarkred mt-3' type='submit'>
						Save
					</button>
					<button
						className='btn btn-secondary mt-3 mx-2'
						onClick={this.handleCancel}>
						Cancel
					</button>
				</form>
			</a>
		);
	}
}

export default AddSubjectTypeForm;
