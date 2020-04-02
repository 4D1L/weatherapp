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
        
        // States to hold icon path.
        this.state.iconSrc = "";
        this.state.iconSrc = this.getIconResource(this.props.icon);

		// icon class string
        this.state.iconClass = "";
        if(this.props.width != undefined)
        {
            // If a width is supplied, then add it to the class string.
            this.state.iconClass += `width: ${this.props.width}; `;
        }

        if(this.props.height != undefined)
        {
            // If a height is supplied, then add it to the class string.
            this.state.iconClass += `height: ${this.props.height}; `;
        }
    }
    

	// rendering a function when the button is clicked
	render() {
        // Return an image of the icon.
		return (
            <img src={this.state.iconSrc} style={this.state.iconClass}></img>
		);
    }
    
    getIconResource(name)
    {
        // Convert the name of the icon to lowercase then retrieve the icon.
        let condition = name.toLowerCase();
        if(condition == "clear")
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
