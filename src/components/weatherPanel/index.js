// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import DailyTile from './tiles/daily';
import HourlyTile from './tiles/hourly';


export default class WeatherPanel extends Component {

	constructor(props){
		super(props);

		// Set initial states
		this.setState({
			// A state to control the UI from parsing data.
			weatherDataParsed: false,

			// WeatherPanel display state.
			showDaily: true,

			// States to hold data for each column in the panel.
			element0Data: [],
			element1Data: [],
			element2Data: [],
			element3Data: [],
			element4Data: [],

			// display state
			display: true

			
		});

		// Parse data depending on the mode, default being Daily.
		if(this.state.showDaily)
		{
			this.parseData(this.props.data, "DAILY");
		} else {
			this.parseData(this.props.data, "HOURLY");
		}
	}

	toggle = (state) => {
		// If a boolean value is not defined, inverse the state, otherwise set the value.
		if(typeof state === 'undefined') {
			this.setState({ showDaily: !this.state.showDaily });
		} else if(typeof state === 'boolean') {
            this.setState({ showDaily: state });
		}

		// Parse the data according to the new display state.
		this.setState({ weatherDataParsed: false });

		// Parse data depending on the mode.
		if(this.state.showDaily) {
			this.parseData(this.props.data, "DAILY");
		} else {
			this.parseData(this.props.data, "HOURLY");
		}
	}

	// rendering a function when the button is clicked
	render() {		
		if(this.state.display)
		{
			return (
				<div className={style.panel}>
					{/* Display a heading depending on the mode */}
					{this.state.showDaily
						? <h1>This week</h1>
						: <h1>Today</h1>
					}
					
					<div className={style.weatherTable}>
						{/* Create a table of tiles, displaying either a DailyTile or an HourlyTile depnding on the mode. */}
						{/* Pass the data concerning that forecast to the tile to present. */}
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element0Data} />
								: <HourlyTile data = {this.state.element0Data} />
							}
							
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element1Data} />
								: <HourlyTile data = {this.state.element1Data} />
							}
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element2Data} />
								: <HourlyTile data = {this.state.element2Data} />
							}
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element3Data} />
								: <HourlyTile data = {this.state.element3Data} />
							}
						</div>
						<div className={style.day}>
							{this.state.showDaily
								? <DailyTile data = {this.state.element4Data} />
								: <HourlyTile data = {this.state.element4Data} />
							}
						</div>
					</div>
				</div>
			);
		}
	}

	parseData(weatherData, type)
	{
		// Parse the data depending on the type needed.
		if(type == "DAILY")
		{
			this.parseDailyData(weatherData);
		} else if(type == "HOURLY")
		{
			this.parseHourlyData(weatherData);
		}
	}

	parseDailyData(weatherData)
	{
		// Store the timestamp of the weather forecast.
		let timestamp = weatherData['list']['7']['dt'];
		let day = new Date(timestamp * 1000);
		let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


		// Store the condition of the first day.
		let firstDayCondition = weatherData['list']['0']['weather']['0']['main'];
		
		// For each of the readings available, calculating the minimum and the maximum temperature.
		let firstDayMinTemp = null;
		let firstDayMaxTemp = null;
		for(let hours = 0; hours <= 7; hours++)
		{
			let index = hours.toString();
			if(firstDayMinTemp == null)
			{
				// If the minimum temperature is not set, then set it.
				firstDayMinTemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
				continue;
			}

			if(firstDayMaxTemp == null)
			{
				// If the maximum temperature is not set, then set it.
				firstDayMaxTemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
				continue;
			}

			// If the current forecast temperature is lower than the minimum temperature, then make that the minimum temperature.
			let minHourlytemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
			if(minHourlytemp < firstDayMinTemp)
				firstDayMinTemp = minHourlytemp;

			// If the current forecast temperature is higher than the maximum temperature, then make that the maximum temperature.
			let maxHourlytemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
			if(maxHourlytemp > firstDayMaxTemp)
				firstDayMaxTemp = maxHourlytemp;		
		}
		
		// Populate the first tile with the data that was found.
		this.setState({ element0Data : [days[day.getDay()%7], firstDayCondition, firstDayMinTemp, firstDayMaxTemp] });

		// Find the minimum and maximum temperature for the remaining days as they have full data sets.
		for(let dayIndex = 1; dayIndex <= 4; dayIndex++)
		{

			let condition = weatherData['list'][(dayIndex * 8) - 1]['weather']['0']['main'];

			let minimumTemp = null;
			let maximumTemp = null;

			// Calculate the position in the list by using the day an dthe hour.
			for(let hourIndex = (dayIndex * 8) - 1; hourIndex <= ((dayIndex + 1) * 8) - 2; hourIndex++)
			{
				let index = hourIndex.toString();
				if(minimumTemp === null) {
					// If the minimum temperature is not set, then set it.
					minimumTemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
					continue;
				}
				if(maximumTemp === null) {
					// If the maximum temperature is not set, then set it.
					maximumTemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
					continue;
				}

				// If the current forecast temperature is lower than the minimum temperature, then make that the minimum temperature.
				let minHourlytemp = parseInt(weatherData['list'][index]['main']['temp_min'], 10);
				if(minHourlytemp < minimumTemp) {
					minimumTemp = minHourlytemp;
				}

				// If the current forecast temperature is higher than the maximum temperature, then make that the maximum temperature.
				let maxHourlyTemp = parseInt(weatherData['list'][index]['main']['temp_max'], 10);
				if(maxHourlyTemp > maximumTemp) {
					maximumTemp = maxHourlyTemp;
				}

			}

			// Populate the array with the correct data which whille then be given to the the tile.

			// Element 0: Day, Element 1: Condition name for icon, Element 2: Minimum Temperature, Element 3: Maximum Temperature
			if(dayIndex == 1)
				this.setState({ element1Data: [days[(day.getDay()+1)%7], condition, minimumTemp, maximumTemp] });
			else if(dayIndex == 2)
				this.setState({ element2Data: [days[(day.getDay()+2)%7], condition, minimumTemp, maximumTemp] });
			else if(dayIndex == 3)
				this.setState({ element3Data: [days[(day.getDay()+3)%7], condition, minimumTemp, maximumTemp] });
			else if(dayIndex == 4)
				this.setState({ element4Data: [days[(day.getDay()+4)%7], condition, minimumTemp, maximumTemp] });				
		}

		// As the data has been parsed, prevent it from being parsed again.
		this.setState({
			weatherDataParsed : true
		});
	}

	parseHourlyData(weatherData)
	{
		// Populate the first tile's data.
		this.setState({ element0Data: ['Now', weatherData['list']['0']['weather']['0']['main'], Math.floor(weatherData['list']['0']['main']['temp'])] });

		for(let index = 1; index <= 4; index++)
		{
			// For the four remaining hours, fetch the time string and temperature.
			let key = index.toString();

			// Create a date object from the time string and then get the hour from that timestamp.
			let hour = new Date(weatherData['list'][key].dt_txt).getHours();

			let temp = Math.floor(weatherData['list'][key]['main']['temp']);

			let condition = weatherData['list'][key]['weather']['0']['main'];

			// Populate the remaining tiles.
			// Element 0: Day, Element 1: Condition name for icon, Element 2: Temperature
			if(index == 1)
				this.setState({ element1Data: [hour, condition, temp] });
			else if(index == 2)
				this.setState({ element2Data: [hour, condition, temp] });
			else if(index == 3)
				this.setState({ element3Data: [hour, condition, temp] });
			else if(index == 4)
				this.setState({ element4Data: [hour, condition, temp] });	
		}

		// As the data has been parsed, prevent it from being parsed again.
		this.setState({
			weatherDataParsed : true
		});
	}
}
