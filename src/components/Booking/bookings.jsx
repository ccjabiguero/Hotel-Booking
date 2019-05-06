import React, {Component} from 'react';
import axios from 'axios';
import TableBooking from './TableBooking.jsx'
import AddBooking from './AddBooking.jsx'
import RowBooking from './RowBooking.jsx'
import SearchBooking from './SearchBooking.jsx'
class Bookings extends Component{
	// component that contains all the logic and other smaller components
	// that form the Read Bookings view
	constructor(){
		super();
		this.state = { 
			bookings: []
		}
	}
	// on mount, call the _refreshBookings() method
	//which fetch all bookings and stored them as this component's state
	componentWillMount(){
		this._refreshBookings();
	}
	_refreshBookings() {
	axios.get("http://localhost:8080/HotelBooking/rest/bookings").then((response) => {
		this.setState({
		bookings: response.data

		})
	});
	}
	render(){ 
		// component for the whole bookings table
		let bookings = this.state.bookings.map((booking)=>{
			return(
				<RowBooking booking={booking} />
			)
		}); 
		// render component on the page
		return(	
		<div className="App container">
			<h2>Booking List</h2> 
			<SearchBooking bookings={bookings}/>
			<AddBooking bookings={this._refreshBookings()}/>
			<TableBooking bookings={bookings}/>
		</div>
		);
	}
}
export default Bookings;