// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'

export default class ButtonRow extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);

        // Set states for clock icon
        this.setState({
            weatherPanelIcon: "clock",
            weatherPanelIconBg: "#d79027"
        })

        // Set states for clothing icon
        this.defaultClothingPanelIconStates();

        // Set states for info icon
        this.defaultInfoPanelIconStates();
    }

    defaultClothingPanelIconStates() {
        // Set states for clothing icon
        this.setState({
            clothingPanelIcon: "tshirt",
            clothingPanelIconBg: "#004F8A"
        });
    }

    defaultInfoPanelIconStates() {
        // Set states for info icon
        this.setState({
            infoPanelIcon: "info",
            infoPanelIconBg: "#69D63C"
        });
    }

    toggle(button, state) {
        // Toggle between the icon and the close button.
        if(button === "CLOTHING") {
            if(state == true) {
                this.setState({
                    clothingPanelIcon: "times",
                    clothingPanelIconBg: "#af1212"
                });
            } else {
                // Revert back to original state
                this.defaultClothingPanelIconStates();
            }
        } else if(button === "INFO") {
            if(state == true) {
                this.setState({
                    infoPanelIcon: "times",
                    infoPanelIconBg: "#af1212"
                });
            } else {
                // Revert back to original state
                this.defaultInfoPanelIconStates();
            }
        }
    }

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.buttons}>
                {/* Clothing button has an icon of a t-shirt */}
                <button class={style.button} onClick={() => this.props.action("CLOTHING")}>
                    <span className="fa-layers fa-fw fa-3x">
                        <FontAwesomeIcon icon="circle" color={this.state.clothingPanelIconBg} />
                        <FontAwesomeIcon icon={this.state.clothingPanelIcon} inverse transform="shrink-8" />
                    </span>
                </button>

                {/* Weather Panel toggle button has an icon of a clock or a calendar */}
                <button class={style.button} onClick={() => this.props.action("WEATHERPANEL")}>
                    <span className="fa-layers fa-fw fa-5x">
                        <FontAwesomeIcon icon="circle" color={this.state.weatherPanelIconBg} transform="shrink-2" />
                        <FontAwesomeIcon icon={this.state.weatherPanelIcon} inverse transform="shrink-8" />
                    </span>
                </button>

                {/* Info button has an icon of an 'i' */}
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
