import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class AddRoom extends Component{
	
	state = {
		newRoomData: {
            roomType: '',
            price: 0.00
		},
		newRoomModal: false
	}
	componentWillMount(){
		axios.get("http://localhost:8080/HotelBooking/rest/rooms").then((response) => {
		this.setState({
		rooms: response.data
		})
	});
	}
	toggleNewRoomModal(){
		this.setState({
			newRoomModal: ! this.state.newRoomModal
		});
	}
	addRoom(){
		axios.post("http://localhost:8080/HotelBooking/rest/rooms", this.state.newRoomData).then((response)=>{
		let { rooms } = this.state;
			rooms.push(response.data);
			this.setState({ rooms, newRoomModal: false, newRoomData: {
				roomType: '',
                price: 0.00
				}
			}); 
		});
	}

	render(){ 
	
		return(	
		<div className="App container">
		<Button color="primary" onClick={this.toggleNewRoomModal.bind(this)} className="my-3">Add Room</Button>
		<Modal isOpen={this.state.newRoomModal} toggle={this.toggleNewRoomModal.bind(this)}>
			<ModalHeader toggle={this.toggleNewRoomModal.bind(this)}>Add a new room</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="roomType">Room Type</Label>
					<Input id="roomType" value={this.state.newRoomData.roomType} onChange={(e) => {
					let { newRoomData } = this.state;

					newRoomData.roomType = e.target.value;

					this.setState({ newRoomData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="price">Price</Label>
					<Input id="price" value={this.state.newRoomData.price} onChange={(e) => {
					let { newRoomData } = this.state;

					newRoomData.price = e.target.value;

					this.setState({ newRoomData });
					}} />
				</FormGroup>

			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={this.addRoom.bind(this)}>Add Room</Button>{' '}
				<Button color="secondary" onClick={this.toggleNewRoomModal.bind(this)}>Cancel</Button>
        	</ModalFooter>
		</Modal>
			</div>
			
		);
	}
}
export default AddRoom;