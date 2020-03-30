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

        this.setState({
            weatherPanelIcon: "clock",
            weatherPanelIconBg: "#d79027"
        })

        this.defaultClothingPanelIconStates();

        this.defaultInfoPanelIconStates();
    }
    
    buttonHover() {
        console.log('Mouse');
    }

    defaultClothingPanelIconStates() {
        this.setState({
            clothingPanelIcon: "tshirt",
            clothingPanelIconBg: "#004F8A"
        });
    }

    defaultInfoPanelIconStates() {
        this.setState({
            infoPanelIcon: "info",
            infoPanelIconBg: "#69D63C"
        });
    }

    toggle(button, state) {
        if(button === "CLOTHING") {
            if(state == true) {
                this.setState({
                    clothingPanelIcon: "times",
                    clothingPanelIconBg: "#af1212"
                });
            } else {
                this.defaultClothingPanelIconStates();
            }
        } else if(button === "INFO") {
            if(state == true) {
                this.setState({
                    infoPanelIcon: "times",
                    infoPanelIconBg: "#af1212"
                });
            } else {
                this.defaultInfoPanelIconStates();
            }
        }
    }

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.buttons}>
                <button class={style.button} onMouseEnter={this.buttonHover.bind(this)} onClick={() => this.props.action("CLOTHING")}>
                    <span className="fa-layers fa-fw fa-3x">
                        <FontAwesomeIcon icon="circle" color={this.state.clothingPanelIconBg} />
                        <FontAwesomeIcon icon={this.state.clothingPanelIcon} inverse transform="shrink-8" />
                    </span>
                </button>

                <button class={style.button} onClick={() => this.props.action("WEATHERPANEL")}>
                    <span className="fa-layers fa-fw fa-5x">
                        <FontAwesomeIcon icon="circle" color={this.state.weatherPanelIconBg} transform="shrink-2" />
                        <FontAwesomeIcon icon={this.state.weatherPanelIcon} inverse transform="shrink-8" />
                    </span>
                </button>

                <button class={style.button} onClick={() => this.props.action("INFO")}>
                    <span className="fa-layers fa-fw fa-3x">
                        <FontAwesomeIcon icon="circle" color={this.state.infoPanelIconBg} />
                        <FontAwesomeIcon icon={this.state.infoPanelIcon} inverse transform="shrink-8" />
                    </span>
                </button>
			</div>
		);
	}
}
