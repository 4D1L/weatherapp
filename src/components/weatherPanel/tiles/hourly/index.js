// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import WeatherIcon from '../../../weatherIcon';

export default class HourlyTile extends Component {

	constructor(props){
        // Use data provided by the weather panel.
		super(props);
	}

	// rendering a function when the button is clicked
	render() {
        // Use flex boxes to define the hourly tile layout.
        return (
            <div className={style.tile}> 
                <div className={style.heading}>
                    {/* Display time on the top */}
                    {this.props.data[0] != "Now"
                        ? this.props.data[0] + ":00"
                        : this.props.data[0]
                    }
                </div>

                <div className={style.icon}>
                    {/* Icon in the middle */}
                    <WeatherIcon icon={this.props.data[1]} width="75%" />
                </div>


                <div className={style.temp}>
                    {/* Temperature on the bottom */}
                    {this.props.data[2]}°
                </div>


            </div>
        );
	}
}
