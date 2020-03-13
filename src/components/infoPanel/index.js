// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class InfoPanel extends Component {

	state = {
		display: false,
		fact: ""
	}

	toggle = (state) => {
		if(typeof state === 'undefined')
			this.setState({ display: !this.state.display });
		else if(typeof state === 'boolean')
			this.setState({ display: state })
	}

	// rendering a function when the button is clicked
	render() {
		if(this.state.display)
		{
			return (
				<div class={style.panel}> 
					<h1>Info Panel</h1>
					<p>{this.state.fact}</p>
				</div>
			);
		}
	}
}
