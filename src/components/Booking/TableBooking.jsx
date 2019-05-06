import React, {Component} from 'react';
import {Table, Alert} from 'reactstrap';
import SearchBooking from './SearchBooking.jsx'
class TableBooking extends Component{
	//placing the data to booking table
	// this.props.booking came from booking.jsx
	render(){
		return(
			!this.props.bookings.length
			? <Alert color="info"> No booking found </Alert>:
			<Table>
				<thead>
					<tr>
                    <th>Booking ID</th>
                    <th>Bookings</th>
                    <th>Room Id </th>
                    <th>Check-in Date</th> 
                    <th>Check-out Date</th> 
                    <th>Total Price</th>
                    <th>Action</th>
					</tr>
				</thead>
				<tbody>
					{this.props.bookings}
				</tbody>
			 </Table>
		);
	}
}
export default TableBooking;