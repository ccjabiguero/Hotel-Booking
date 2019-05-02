import React, {Component} from 'react';
import {Table, Alert} from 'reactstrap';
class GuestTable extends Component{
	//placing the data to guests table
	// this.props.guests came from guest.jsx
	render(){
		return(	
			!this.props.guests.length
			? <Alert color="info"> No guests found </Alert>:
			<Table>
				<thead>
					<tr>
						<th>Guest ID</th>
						<th>First Name</th>
						<th>Middle Name</th>
						<th>Last Name</th>
						<th>Birth Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{this.props.guests}
				</tbody>
			 </Table>
		);
	}
}
export default GuestTable;