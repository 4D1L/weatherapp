// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import WeatherIcon from '../../../weatherIcon';

export default class DailyTile extends Component {

	constructor(props){
        // Use data provided by the weather panel.
		super(props);
	}

	// rendering a function when the button is clicked
	render() {
        // Use flex boxes to define the daily tile layout.
        return (
            <div className={style.tile}> 
                <div className={style.heading}>
                    {/* Display day on the top */}
                    {this.props.data[0]}
                </div>

                <div className={style.icon}>
                    {/* Icon in the middle */}
                    <WeatherIcon icon={this.props.data[1]} width="75%" />
                </div>


                <div className={style.temps}>
                    {/* Temperatures on the bottom */}
                    <div className={style.min}>
                        {this.props.data[2]}°
                    </div>
                    <div className={style.max}>
                        {this.props.data[3]}°
                    </div>
                </div>


            </div>
        );
	}
}
