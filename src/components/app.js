// import preact
import { h, Component } from 'preact';

//FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCircle, faTshirt, faInfo, faSquare, faCheck, faClock } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCircle, faTshirt, faInfo, faSquare, faCheck, faClock)

// import required Components from 'components/'
import Iphone from './iphone';
import Ipad from './ipad';

export default class App extends Component {
//var App = React.createClass({

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
	componentDidMount() {
		const urlBar = window.location.href;
		if(urlBar.includes("ipad")) {
			this.setState({
				"isTablet": true
			});
		} else {
			this.setState({
				"isTablet": false
			});
		}
	}

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){
		if(this.state.isTablet){
			return (
				<div id="app">
					<Ipad/ >
				</div>   				
			);
		} 
		else {
			return (
				<div id="app">
					<Iphone/ >
				</div>
			);
		}
	}
}