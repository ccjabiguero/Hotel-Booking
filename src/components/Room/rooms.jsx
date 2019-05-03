import React, {Component} from 'react';
import axios from 'axios';
import RoomTable from './table_room.jsx'
import AddRoom from './add_room.jsx'
import RoomRow from './row_room.jsx'
//import SearchRoom from './search_room.jsx'
class Rooms extends Component{
	// component that contains all the logic and other smaller components
	// that form the Read Rooms view
	constructor(){
		super();
		this.state = { 
			rooms: []
		}
	
	}
	// on mount, call the _refreshRooms() method
	//which fetch all rooms and stored them as this component's state
	componentWillMount(){
		this._refreshRooms();
	}
	_refreshRooms() {
	axios.get("http://localhost:8080/HotelBooking/rest/rooms").then((response) => {
		this.setState({
		rooms: response.data
		})
	});
	}
	render(){ 
		// component for the whole rooms table
		let rooms = this.state.rooms.map((room)=>{
			return(
				<RoomRow room={room} rooms={rooms}/>
			)
		}); 
		// render component on the page
		return(	
		<div className="App container">
			<h2>Room List</h2> 
			<AddRoom rooms={this._refreshRooms()}/>
			<RoomTable rooms={rooms}/>
		</div>
		);
	}
}
export default Rooms;