import React, { Component } from 'react';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class Bookings extends Component {
  render() {
    return (
      <div className="my-app">
       <h1>Bookings</h1>
       <Table>
				<thead>
					<tr>
						<th>Booking ID</th>
						<th>Guests</th>
						<th>Room ID</th>
						<th>Check-in Date</th>
						<th>Check-out Date</th>
						<th>Total Price</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</Table>
      </div>
    );
  }
}

export default Bookings;
