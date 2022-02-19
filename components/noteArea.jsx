import React from 'react';

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			height: '500px',
			overflow: 'hidden',
		};
		this.maxHeight = window.innerHeight - 100;
	}

	handleChange = (event) => {
		console.log({ [event.target.name]: event.target.value });
		let textarea = document.querySelector('textarea');
		console.log(textarea.scrollHeight);
		console.log(this.maxHeight);
		let overflow = textarea.scrollHeight > this.maxHeight ? 'scroll' : 'hidden';
		console.log(overflow);
		this.setState({
			[event.target.name]: event.target.value,
			['height']: `${textarea.scrollHeight}px`,
			['overflow']: overflow,
		});
		console.log(this.state.height);
	};

	componentDidMount() {}
	render() {
		const textAreaStyle = {
			width: '100%',
			outline: 'none',
			padding: '10px',
			borderRadius: '10px',
			minHeight: '500px',
			maxHeight: '1000px',
			height: this.state.height,
			resize: 'none',
			overflow: this.state.overflow,
		};
		return (
			<div>
				<form action='' className='mb-4'>
					<textarea
						className='form-control'
						id=''
						name='text'
						style={textAreaStyle}
						rows='10'
						onChange={this.handleChange}></textarea>
				</form>
			</div>
		);
	}
}

export default EventList;
