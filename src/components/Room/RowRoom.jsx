import React, {Component} from 'react';
import EditAndDeleteRoom from  './EditAndDeleteRoom.jsx'

class RoomRow extends Component{
	// component that renders a single room
	// see ./rooms.jsx
	render(){
		return(	
			<tr key={this.props.room.id}>
				<td>{this.props.room.id}</td>
				<td>{this.props.room.roomType}</td>
				<td>{this.props.room.price}</td>
				<td>
				<EditAndDeleteRoom 
					room={this.props.room}
					roomId={this.props.room.id}/> 
				</td>
			</tr>
		);
	}
}
export default RoomRow;