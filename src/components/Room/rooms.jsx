import React, { Component } from 'react';
import {Table} from 'reactstrap';

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
						<th>Action</th>
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
