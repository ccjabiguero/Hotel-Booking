import React, {Component} from 'react';
import axios from 'axios';
import GuestTable from './table_guest.jsx'
import CreateGuest from './create_guest.jsx'
import GuestRow from './row_guest.jsx'

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
				<GuestRow guest={guest} guests={guests}/>
			)
		}); 
		// render component on the page
		return(	
		<div className="App container">
			<h2>Guest List</h2> 
			<CreateGuest guests={this._refreshGuests()}/>
			<GuestTable guests={guests}/>
		</div>
		);
	}
}
export default Guests;