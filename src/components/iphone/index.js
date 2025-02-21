// import preact
import { h, render, Component } from 'preact';

//import loader
import { Pulsate } from 'styled-loaders';

// import stylesheets for ipad & button
import style from './style';

// import jquery for API calls
import $ from 'jquery';
// import the Button component
import ButtonRow from '../buttonRow';

import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import WeatherIcon from '../weatherIcon';
import ClothingPanel from '../clothingPanel';
import InfoPanel from '../infoPanel';
import WeatherPanel from '../weatherPanel';

//import sunny from '../../assets/icons/weather/sunny.png';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		
		// initial app states
		this.setState({ 
			displayHourly: false,
			todayMin: "",
			todayMax: "",
			condition: "",
			dataParsed: false
		});
	}

	componentDidMount()
	{
		// The app should fetch data from the API when the iphone component has 'started'.
		this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=c1e7fb34ff7d87c89545e2af92cfd1e0";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		});
	}

	buttonRowHandler(button) {
		if(button == 'CLOTHING' || button == 'INFO')
		{
			// Handle button presses for the two panels.
			if(button == 'CLOTHING')
			{	
				if(this.infoPanel.state.display)
				{
					//If the other panel is open, close it and then open the panel being shown.
					this.infoPanel.toggle();
					this.buttonRow.toggle("INFO", false);
				}

				// Toggle displa state of the panel.
				this.clothingPanel.toggle();
				this.buttonRow.toggle("CLOTHING", this.clothingPanel.state.display);
			} else if(button == 'INFO')
			{
				if(this.clothingPanel.state.display)
				{
					//If the other panel is open, close it and then open the panel being shown.
					this.clothingPanel.toggle();
					this.buttonRow.toggle("CLOTHING", false);
				}

				// Toggle displa state of the panel.
				this.infoPanel.toggle();
				this.buttonRow.toggle("INFO", this.infoPanel.state.display);
			}
			
		} else if(button == "WEATHERPANEL")
		{
			// Toggle between hourly and weekly view.
			this.weatherPanel.toggle();
			if(this.state.displayHourly == false)
			{
				// Set display state to hourly and then update button icon.
				this.setState({ displayHourly: true });
				this.buttonRow.state.weatherPanelIcon = "calendar-week";
			} else {
				// Set display state to weekly and then update button icon.
				this.setState({ displayHourly: false });
				this.buttonRow.state.weatherPanelIcon = "clock";
			}
		}
	}

	// the main render method for the iphone component
	render() {

		if(!this.state.dataParsed) {
			// If data from API has not been ready, display the loading animation.
			return (
				<div class={ style.container }>
					<Pulsate color={'#33b7de'} />
				</div>
			);
		}

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					{/* Display location and weather condition. */}
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.description }</div>
					
					<div class={style.icon}>
						{/* Display weather icon only if weather data has been parsed. */}
						{this.state.dataParsed
							? <WeatherIcon icon={this.state.condition} width="150px" />
							: null
						}
					</div>
					
					<div class={ style.currentTemperatures }>
						<span class={ style.min }>Min: { this.state.todayMin }</span>
						<span class={ tempStyles }>{ this.state.temp }</span>
						<span class={ style.max }>Max: { this.state.todayMax }</span>
					</div>
				</div>

				{/* Display button row which consists of cloting & info panel toggles + toggle between hourly + weekly. */}
				<ButtonRow action={this.buttonRowHandler.bind(this)} ref={(comp) => this.buttonRow = comp} />

				{/* Section for panels. */}
				<section>
					<ClothingPanel data={this.state.weatherData} ref={(comp) => this.clothingPanel = comp} 
									condition={this.state.condition} temp={this.state.temp} 
										min={this.state.todayMin} max={this.state.todayMax} 
										/>
					<InfoPanel ref={(comp) => this.infoPanel = comp} />
				</section>

				{/* Section for weather details. */}
				<section class={ style.details }>
					<WeatherPanel data={this.state.weatherData} ref={(comp) => this.weatherPanel = comp} />
				</section>
				
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		let location = parsed_json['city']['name'];
		let temp_c = Math.floor(parsed_json['list']['0']['main']['temp']);
		let description = parsed_json['list']['0']['weather']['0']['description'];
		var condition = parsed_json['list']['0']['weather']['0']['main'];

		// Get min + max temperature by finding lowest + largest value from the list.
		let minTempToday = this.getTodayMinTemp(parsed_json) + "°";
		let maxTempToday = this.getTodayMaxTemp(parsed_json) + "°";

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			description : description,
			todayMin: minTempToday,
			todayMax: maxTempToday,
			weatherData: parsed_json,
			condition: condition,
			dataParsed: true
		});
	}

	getTodayMinTemp = (weatherData) => {
		let minimum = null;
		//Go through the forecasts for today.
		for(let i = 0; i <= 7; i++) {
			// Convert current value to string so it can be used as an index.
			let index = i.toString();
			if(minimum === null) {
				//If no value is set as the minimum, let this value be the minimum.
				minimum = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
				continue;
			}

			// If the temperature of the forecast is lower, then make that the minimum.
			let temp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);

			if(temp < minimum) {
				minimum = temp;
			}
		}

		return minimum;
	};

	getTodayMaxTemp = (weatherData) => {
		let maximum = null;

		//Go through the forecasts for today.
		for(let i = 0; i <= 7; i++) {
			// Convert current value to string so it can be used as an index.
			let index = i.toString();
			if(maximum === null) {
				//If no value is set as the maximum, let this value be the minimum.
				maximum = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
				continue;
			}

			// If the temperature of the forecast is lower, then make that the maximum.
			let temp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);

			if(temp > maximum) {
				maximum = temp;
			}
		}

		return maximum;
	};
}
