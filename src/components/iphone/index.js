// import preact
import { h, render, Component } from 'preact';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
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
		// button display state
		this.setState({ 
			display: false,
			displayHourly: false,
			todayMin: "",
			todayMax: "",
			condition: "",
			dataParsed: false
			//weatherData: []
		});
	}

	componentDidMount()
	{
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
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	buttonRowHandler(button) {
		if(button == 'CLOTHING' || button == 'INFO')
		{
			if(button == 'CLOTHING')
			{	
				if(this.infoPanel.state.display)
				{
					this.infoPanel.toggle();
				}
				this.clothingPanel.toggle();
			} else if(button == 'INFO')
			{
				if(this.clothingPanel.state.display)
				{
					this.clothingPanel.toggle();
				}
				this.infoPanel.toggle();
			}
			
		} else if(button == "WEATHERPANEL")
		{
			this.weatherPanel.toggle();
			if(this.state.displayHourly == false)
			{
				this.setState({ displayHourly: true });
				console.log('CHANGE to hourly;');				
			} else {
				this.setState({ displayHourly: false });
			}
		}
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.description }</div>
					
					<div class={style.icon}>
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
				<ButtonRow action={this.buttonRowHandler.bind(this)} />

				<section>
					<ClothingPanel ref={(comp) => this.clothingPanel = comp} />
					<InfoPanel ref={(comp) => this.infoPanel = comp} />
				</section>

				<section class={ style.details }>
					<WeatherPanel data={this.state.weatherData} ref={(comp) => this.weatherPanel = comp} />
				</section>
				<div class= { style_iphone.container }> 
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		//console.log(parsed_json);
		let location = parsed_json['city']['name'];
		let temp_c = Math.floor(parsed_json['list']['0']['main']['temp']);
		let description = parsed_json['list']['0']['weather']['0']['description'];
		var condition = parsed_json['list']['0']['weather']['0']['main'];

		let minTempToday = this.getTodayMinTemp(parsed_json) + "°";
		let maxTempToday = this.getTodayMaxTemp(parsed_json) + "°";
		console.log(condition);
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
		for(let i = 0; i <= 7; i++) {
			let index = i.toString();
			if(minimum === null) {
				minimum = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
				continue;
			}

			let temp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);

			if(temp < minimum) {
				minimum = temp;
			}
		}

		return minimum;
	};

	getTodayMaxTemp = (weatherData) => {
		let maximum = null;
		for(let i = 0; i <= 7; i++) {
			let index = i.toString();
			if(maximum === null) {
				maximum = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
				continue;
			}

			let temp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);

			if(temp > maximum) {
				maximum = temp;
			}
		}

		return maximum;
	};
}
