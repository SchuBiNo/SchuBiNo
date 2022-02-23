import React from 'react';

class Loader extends React.Component {
	render() {
		return (
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}
}

export default Loader;
