// import preact
import { h, Component } from 'preact';

//FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCircle, faTshirt, faInfo, faSquare, faCheck, faClock, faCalendarWeek, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCircle, faTshirt, faInfo, faSquare, faCheck, faClock, faCalendarWeek, faTimes)

// import required Components from 'components/'
import Iphone from './iphone';

export default class App extends Component {
//var App = React.createClass({

	/*
		A render method to display the required Component on screen.
	*/
	render()
	{
		return (
			<div id="app">
				<Iphone/ >
			</div>
		);

	}
}