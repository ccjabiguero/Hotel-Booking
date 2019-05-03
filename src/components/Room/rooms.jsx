import React, {Component} from 'react';
import axios from 'axios';
import TableRoom from './TableRoom.jsx'
import AddRoom from './AddRoom.jsx'
import RowRoom from './RowRoom.jsx'
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
				<RowRoom room={room} rooms={rooms}/>
			)
		}); 
		// render component on the page
		return(	
		<div className="App container">
			<h2>Room List</h2> 
			<AddRoom rooms={this._refreshRooms()}/>
			<TableRoom rooms={rooms}/>
		</div>
		);
	}
}
export default Rooms;