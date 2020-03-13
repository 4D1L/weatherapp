// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class ButtonRow extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// button state
		this.state.buttonClass = "";
    }
    
    buttonHover() {
        console.log('Mouse');
    }

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.buttons}>
                <button class={style.button} onMouseEnter={this.buttonHover} onClick={() => this.props.action("CLOTHING")}>
                    <span className="fa-layers fa-fw fa-3x">
                        <FontAwesomeIcon icon="circle" color="#d7e102" transform="shrink-2" />
                        <FontAwesomeIcon icon="tshirt" inverse transform="shrink-8" />
                    </span>
                </button>

                <button class={style.button} onClick={() => this.props.action("WEATHERPANEL")}>
                    <span className="fa-layers fa-fw fa-5x">
                        <FontAwesomeIcon icon="circle" color="cyan" transform="shrink-2" />
                        <FontAwesomeIcon icon="clock" inverse transform="shrink-8" />
                    </span>
                </button>

                <button class={style.button} onClick={() => this.props.action("INFO")}>
                    <span className="fa-layers fa-fw fa-3x">
                        <FontAwesomeIcon icon="circle" color="green" transform="shrink-2" />
                        <FontAwesomeIcon icon="info" inverse transform="shrink-8" />
                    </span>
                </button>
			</div>
		);
	}
}
