// import preact
import { h, render, Component } from 'preact';
import style from './style';

import Sunny from '../../assets/icons/weather/Sunny.png';
import Atmosphere from '../../assets/icons/weather/Atmosphere.png';
import Thunderstorm from '../../assets/icons/weather/Thunderstorm.png';
import Drizzle from '../../assets/icons/weather/Drizzle.png';
import Rain from '../../assets/icons/weather/Rain.png';
import Snow from '../../assets/icons/weather/Snow.png';
import Clouds from '../../assets/icons/weather/Clouds.png';

export default class WeatherIcon extends Component {

	// a constructor with initial set states
	constructor(props){
        super(props);
        
        this.state.iconSrc = "";
        this.state.iconSrc = this.getIconResource(this.props.icon);

		// button state
        this.state.iconClass = "";
        if(this.props.width != undefined)
        {
            this.state.iconClass += `width: ${this.props.width}; `;
        }

        if(this.props.height != undefined)
        {
            this.state.iconClass += `height: ${this.props.height}; `;
        }
    }
    

	// rendering a function when the button is clicked
	render() {
		return (
            <img src={this.state.iconSrc} style={this.state.iconClass}></img>
		);
    }
    
    getIconResource(name)
    {
        let condition = name.toLowerCase();
        if(condition == "sunny")
        {
            return Sunny;
        } else if(condition == "atmosphere")
        {
            return Atmosphere;
        } else if(condition == "thunderstorm")
        {
            return Thunderstorm;
        } else if(condition == "drizzle")
        {
            return Drizzle;
        } else if(condition == "rain")
        {
            return Rain;
        } else if(condition == "snow")
        {
            return Snow;
        } else if(condition == "clouds")
        {
            return Clouds;
        }
    }
}
