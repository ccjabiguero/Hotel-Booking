import React, {Component} from 'react';
import {Table, Alert} from 'reactstrap';
class RoomTable extends Component{
	//placing the data to rooms table
	// this.props.rooms came from guest.jsx
	render(){
		return(	
			!this.props.rooms.length
			? <Alert color="info"> No rooms found </Alert>:
			<Table>
				<thead>
					<tr>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Price per Night</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.props.rooms}
				</tbody>
			 </Table>
		);
	}
}
export default RoomTable;