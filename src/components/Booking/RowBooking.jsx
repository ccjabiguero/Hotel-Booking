import React, {Component} from 'react';
import EditAndDeleteBooking from  './EditAndDeleteBooking.jsx'

class BookingRow extends Component{
	// component that renders a single booking
	// see ./bookings.jsx
	//bookingId is for delete
	render(){
		return(	
			<tr key={this.props.booking.id}>
				<td>{this.props.booking.id}</td>
				<td>{this.props.booking.guests}</td>
				<td>{this.props.booking.roomId}</td>
				<td>{this.props.booking.checkIn}</td>
				<td>{this.props.booking.checkOut}</td>
                <td>{this.props.booking.totalPrice}</td>
				<td>
				<EditAndDeleteBooking 
					booking={this.props.booking}
					bookingId={this.props.booking.id}/> 
				</td>
			</tr>
		);
	}
}
export default BookingRow;