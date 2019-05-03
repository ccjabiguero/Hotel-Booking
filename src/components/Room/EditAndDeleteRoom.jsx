import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class EditAndDeleteRoom extends Component{
	
	state = {
		editRoomData: {
			id:'',
			roomType: '',
			price: 0.00,
		},
		editRoomModal: false
	}
	componentWillMount(){
		this._refreshRooms();
	}
	toggleEditRoomModal() {
		this.setState({
		  editRoomModal: ! this.state.editRoomModal
		});
	  }
	updateRoom() {
		let { roomType, price  } = this.state.editRoomData;
	
		axios.put("http://localhost:8080/HotelBooking/rest/rooms/" + this.state.editRoomData.id, {
			roomType, price
		}).then((response) => {
			console.log(response.data)
	this.setState({
			  editRoomModal: false, editRoomData: { id: '', roomType: '', price: '' }
			})
			
		});
	}
	editRoom(id, roomType, price) {
		this.setState({
			editRoomData: { id, roomType, price  }, editRoomModal: ! this.state.editRoomModal
		});
	}
	deleteRoom(id) {
		axios.delete("http://localhost:8080/HotelBooking/rest/rooms/" + id).then((response) => {
			this._refreshRooms();
		});
		}
	_refreshRooms() {
	axios.get("http://localhost:8080/HotelBooking/rest/rooms").then((response) => {
		this.setState({
		rooms: response.data
		})
	});
	}
	render(){ 
	
		return(	
			<div>
		<Button color = "success" size="md"className="mr-2" onClick={this.editRoom.bind(this, 
				this.props.room.id, this.props.room.roomType, this.props.room.price)}>
				Edit
		</Button>
		<Button color = "danger" size="md" onClick={this.deleteRoom.bind(this, this.props.roomId)}>Delete</Button>
        	
		<Modal isOpen={this.state.editRoomModal} toggle={this.toggleEditRoomModal.bind(this)}>
			<ModalHeader toggle={this.toggleEditRoomModal.bind(this)}>Edit a new room</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="roomType">Room Type</Label>
					<Input id="roomType" value={this.state.editRoomData.roomType} onChange={(e) => {
						let { editRoomData } = this.state;

						editRoomData.roomType = e.target.value;

						this.setState({ editRoomData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="price">Price per Night</Label>
					<Input id="price" value={this.state.editRoomData.price} onChange={(e) => {
					let { editRoomData } = this.state;

					editRoomData.price = e.target.value;

					this.setState({ editRoomData });
					}} />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
			<Button color="primary" onClick={this.updateRoom.bind(this)}>Update Room</Button>{' '}
			<Button color="secondary" onClick={this.toggleEditRoomModal.bind(this)}>Cancel</Button>
			</ModalFooter>
    	</Modal>
			</div>
		);
	}
}
export default EditAndDeleteRoom;