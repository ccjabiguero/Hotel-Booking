import React, { Component } from 'react';
import {Table} from 'reactstrap';
import axios from 'axios'
class Rooms extends Component {
	state = { 
		rooms: []
	}
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
  render() {
		let rooms = this.state.rooms.map((room)=>{
			return(
				<tr key={room.id}>
						<td>{room.id}</td>
						<td>{room.roomType}</td>
						<td>{room.price}</td>
				</tr>
			);
    })
    return (
      <div className="App container">
       <h1>Room List</h1>
       <Table>
				<thead>
					<tr>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Price per Night</th>
					</tr>
				</thead>
				<tbody>
					{rooms}
				</tbody>
			</Table>
      </div>
    );
  }
}

export default Rooms;
