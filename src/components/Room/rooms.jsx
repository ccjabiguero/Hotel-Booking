import React, { Component } from 'react';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class Rooms extends Component {
  render() {
    return (
      <div className="my-app">
       <h1>Rooms</h1>
       <Table>
				<thead>
					<tr>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Price per Night</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</Table>
      </div>
    );
  }
}

export default Rooms;
