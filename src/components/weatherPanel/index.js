// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import DailyTile from '../dailyTile';


export default class WeatherPanel extends Component {

	constructor(props){
		super(props);
		this.setState({
			weatherDataParsed: false,
			showDaily: true,
			element0Data: [],
			element1Data: [],
			element2Data: [],
			element3Data: [],
			element4Data: [],
		});
	}

	state = {
		display: true,
	}

	toggle = (state) => {
		if(typeof state === 'undefined') {
			this.setState({ showDaily: !this.state.showDaily });
		} else if(typeof state === 'boolean') {
            this.setState({ showDaily: state });
		}

		this.setState({ weatherDataParsed: false });
		if(this.state.showDaily)
		{
			//if(WeatherData instanceof Object)
			//{
				this.parseData(this.props.data, "DAILY");
			//}
		} else {
			//if(WeatherData instanceof Object)
			//{
				console.log('Prepare hourly');
				//this.parseData(WeatherData, "HOURLY");
			//}			
		}
	}

	// rendering a function when the button is clicked
	render() {
		var WeatherData = this.props.data;
		if(!(WeatherData instanceof Object))
		{
			return console.log('not array');
		}
		if(!this.state.weatherDataParsed)
		{
			if(this.state.showDaily)
			{
				this.parseData(WeatherData, "DAILY");
			} else {
				this.parseData(WeatherData, "HOURLY");
			}
		}
		
		console.log(WeatherData);
		if(this.state.display)
		{
			return (
				<div className={style.panel}> 
					<h1>Weather</h1>
					<div className={style.weatherTable}>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element0Data} />
								: null
							}
							
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element1Data} />
								: null
							}
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element2Data} />
								: null
							}
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element3Data} />
								: null
							}
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element4Data} />
								: null
							}
						</div>
					</div>
				</div>
			);
		}
	}

	parseData(weatherData, type)
	{
		if(type == "DAILY")
		{
			this.parseDailyData(weatherData);
		}
	}

	parseDailyData(weatherData)
	{
		let timestamp = weatherData['list']['7']['dt'];
		let day = new Date(timestamp * 1000);
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		let firstDayMinTemp = null;
		let firstDayMaxTemp = null;
		for(let hours = 0; hours <= 7; hours++)
		{
			let index = hours.toString();
			if(firstDayMinTemp == null)
			{
				firstDayMinTemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
				continue;
			}

			if(firstDayMaxTemp == null)
			{
				firstDayMaxTemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
				continue;
			}

			let minHourlytemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
			if(minHourlytemp < firstDayMinTemp)
				firstDayMinTemp = minHourlytemp;

			let maxHourlytemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
			if(maxHourlytemp > firstDayMaxTemp)
				firstDayMaxTemp = maxHourlytemp;		
		}
		this.setState({ element0Data : [days[day.getDay()%7], firstDayMinTemp, firstDayMaxTemp] });


		for(let dayIndex = 1; dayIndex <= 4; dayIndex++)
		{
			let minimumTemp = null;
			let maximumTemp = null;
			for(let hourIndex = (dayIndex * 8) - 1; hourIndex <= ((dayIndex + 1) * 8) - 2; hourIndex++)
			{
				let index = hourIndex.toString();
				if(minimumTemp === null) {
					minimumTemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
					continue;
				}
				if(maximumTemp === null) {
					maximumTemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
					continue;
				}


				let minHourlytemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
				if(minHourlytemp < minimumTemp) {
					minimumTemp = minHourlytemp;
				}

				let maxHourlyTemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
				if(maxHourlyTemp > maximumTemp) {
					maximumTemp = maxHourlyTemp;
				}

			}

			if(dayIndex == 1)
				this.setState({ element1Data: [days[(day.getDay()+1)%7], minimumTemp, maximumTemp] });
			else if(dayIndex == 2)
				this.setState({ element2Data: [days[(day.getDay()+2)%7], minimumTemp, maximumTemp] });
			else if(dayIndex == 3)
				this.setState({ element3Data: [days[(day.getDay()+3)%7], minimumTemp, maximumTemp] });
			else if(dayIndex == 4)
				this.setState({ element4Data: [days[(day.getDay()+4)%7], minimumTemp, maximumTemp] });				
		}

		this.setState({
			element1Title: days[day.getDay()%7],
			weatherDataParsed : true
		});
	}
}
