// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class InfoPanel extends Component {

	constructor(props){
		super(props);

		// Set initial states
		this.setState({
			display: false,
			fact: ""
		});

		this.facts = ["The wind doesn’t make a sound until it blows against an object.",
				      "For each minute of the day, 1 billion tonnes of rain falls on the Earth."];
	}

	toggle = (state) => {
		if(typeof state === 'undefined')
			this.setState({ display: !this.state.display });
		else if(typeof state === 'boolean')
			this.setState({ display: state })
	}

	componentDidMount() {
		this.setState({ fact: this.getRandomFact() });
	}

	// rendering a function when the button is clicked
	render() {
		if(this.state.display)
		{
			return (
				<div class={style.panel}> 
					<h1>Fact</h1>
					<p>{this.state.fact}</p>
				</div>
			);
		}
	}

	getRandomFact() {
		return this.facts[Math.floor(Math.random() * this.facts.length)]
	}
}
