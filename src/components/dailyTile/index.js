// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class DailyTile extends Component {

	constructor(props){
		super(props);
	}

	// rendering a function when the button is clicked
	render() {
        return (
            <div className={style.tile}> 
                <div className={style.icon}>
                    ICON
                </div>


                <div className={style.heading}>
                    {this.props.data[0]}
                </div>

                <div className={style.right}>
                    <div className={style.temps}>
                        <div className={style.min}>
                            {this.props.data[1]}°
                        </div>
                        <div className={style.max}>
                            {this.props.data[2]}°
                        </div>
                    </div>
                </div>

            </div>
        );
	}
}
