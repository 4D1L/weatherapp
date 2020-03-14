// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import WeatherIcon from '../weatherIcon';

export default class HourlyTile extends Component {

	constructor(props){
		super(props);
	}

	// rendering a function when the button is clicked
	render() {
        return (
            <div className={style.tile}> 
                <div className={style.heading}>
                    {this.props.data[0] != "Now"
                        ? this.props.data[0] + ":00"
                        : this.props.data[0]
                    }
                </div>

                <div className={style.icon}>
                    <WeatherIcon icon={this.props.data[1]} width="75%" />
                </div>


                <div className={style.temp}>
                    {this.props.data[2]}°
                </div>


            </div>
        );
	}
}
