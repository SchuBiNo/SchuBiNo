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
		this.checkTimeout = null;
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
		if (this.checkTimeout) clearTimeout(this.checkTimeout);
		this.checkTimeout = setTimeout(() => this.check(), 1500);
		event.target.value = '<strike>' + event.target.value + '</strike>';
	};

	check = () => {
		console.log('check');
		fetch('/api/language/check', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				language: 'en',
				text: this.state.text,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
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
