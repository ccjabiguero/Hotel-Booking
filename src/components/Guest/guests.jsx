import React, {Component} from 'react';
import axios from 'axios';
import TableGuest from './TableGuest.jsx'
import AddGuest from './AddGuest.jsx'
import RowGuest from './RowGuest.jsx'
import SearchGuest from './SearchGuest.jsx'
class Guests extends Component{
	// component that contains all the logic and other smaller components
	// that form the Read Guests view
	constructor(){
		super();
		this.state = { 
			guests: []
		}
	}
	// on mount, call the _refreshGuests() method
	//which fetch all guests and stored them as this component's state
	componentWillMount(){
		this._refreshGuests();
	}
	_refreshGuests() {
	axios.get("http://localhost:8080/HotelBooking/rest/guests").then((response) => {
		this.setState({
		guests: response.data

		})
	});
	}
	render(){ 
		// component for the whole guests table
		let guests = this.state.guests.map((guest)=>{
			return(
				<RowGuest guest={guest} />
			)
		}); 
		// render component on the page
		return(	
		<div className="App container">
			<h2>Guest List</h2> 
			<SearchGuest guests={guests}/>
			<AddGuest guests={this._refreshGuests()}/>
			<TableGuest guests={guests}/>
		</div>
		);
	}
}
export default Guests;