// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class HourlyTile extends Component {

	constructor(props){
		super(props);
	}

	// rendering a function when the button is clicked
	render() {
        return (
            <div className={style.tile}> 
                <div className={style.heading}>
                    {this.props.data[0]}
                </div>

                <div className={style.icon}>
                    <img style="width: 55%" src="https://lh3.googleusercontent.com/proxy/BrXfIzcoCWVmo6zAz1udcrhd6nXvekr0wXYXPn6fcWp4D8KCgsuPT9VlFLxLhErf0RL2I6cekGhO3kFvlPm-YmgK_OlhKIFHU68vlQ7lFQfq5HYZORNDEWGvnWE2tSRMH9FIFDDhftCf"></img>
                </div>


                <div className={style.temp}>
                    {this.props.data[1]}°
                </div>


            </div>
        );
	}
}
