// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class ClothingPanel extends Component {

	// a constructor with initial set states
	constructor(props){
        super(props);
		
		this.state.display = false;
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
					<h1>Clothing</h1>
					<p class={style.description}>The temperature is <b>currently</b> {this.props.temp}°. 
					The <b className={style.min}>minimum</b> temperature today will be {this.props.min} while the <b className={style.max}>maximum</b> temperature will be {this.props.max}.</p>
				
					<p class={style.clothingSuggestion}>{this.generateClothingText()}</p>
				</div>
			);
		}
	}

	generateClothingText()
	{
		//Fetch current weather condition that was retrieved by the app.
		let condition = this.props.condition;

		let description = "";
		let weatherSuggestion = "";
		let clothingSuggestion = "";

		//Generate a message for each condition type provided by the API.
		if(condition == "Clear")
		{
			description =  "The skies are clear, it should be a good day today! ";
		} else if(condition == "Rain")
		{
			description = "It will rain today. ";
			weatherSuggestion = "Make sure to carry an umbrella! ";
		} else if(condition == "Clouds")
		{
			description = "It is cloudy today. ";
		} else if(condition = "Drizzle")
		{
			description = "There will be light rain today! ";
			weatherSuggestion = "Make sure to carry an umbrella! ";
		} else if(condition == "Thunderstorm")
		{
			description = "There will be a Thunderstorm today! ";
			weatherSuggestion = "Make sure to use an umbrella! ";
		} else if(condition == "Atmosphere")
		{
			description = "It is foggy outside and you might find it hard to see outside! ";
		} else if(condition == "Snow")
		{
			description = "It will snow today! ";
			weatherSuggestion = "Make sure to dress appropriately! ";
		}

		// Make suggestion based on: https://thinkmetric.org.uk/basics/temperature/
		let temperature = this.props.temp;
		const tempCold = 0;
		const tempWarm = 20;
		const tempHot = 30;

		if(temperature < tempCold)
		{
			//Freezing
			clothingSuggestion = "As it is freezing outside, dress in layers. A heavy jacket will keep you warm outside.";
		} else if(temperature >= tempCold && temperature < tempWarm)
		{
			//Cold
			clothingSuggestion = "As it is cold outside, dress in layers. A jumper and a jacket would be good to wear.";
		} else if(temperature >= tempWarm && temperature < tempHot)
		{
			//Warm
			clothingSuggestion = "It's warm outside. Dress lightly but carry a jacket in case of a change of temperature!"
		} else if(temperature >= tempHot)
		{
			//Hot
			clothingSuggestion = "It is hot outside! Dress lightly and drink plenty of water!"
		}

		return description + weatherSuggestion + clothingSuggestion;
	}
}
