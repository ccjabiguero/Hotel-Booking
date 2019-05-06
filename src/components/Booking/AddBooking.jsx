import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class AddBooking extends Component{
	
	state = {
		newBookingData: {
			guests: '',
			roomId: '',
			checkIn: '',
			checkOut: '',
			totalPrice: ''
		},
		newBookingModal: false
	}
	componentWillMount(){
		axios.get("http://localhost:8080/HotelBooking/rest/bookings").then((response) => {
		this.setState({
		bookings: response.data
		})
	});
	}
	toggleNewBookingModal(){
		this.setState({
			newBookingModal: ! this.state.newBookingModal
		});
	}
	addBooking(){
		axios.post("http://localhost:8080/HotelBooking/rest/bookings", this.state.newBookingData).then((response)=>{
		let { bookings } = this.state;
			bookings.push(response.data);
			this.setState({ bookings, newBookingModal: false, newBookingData: {
				guests: '',
				roomId: '',
				checkIn: '',
				checkOut: '',
				totalPrice: ''
				}
			}); 
		});
	}

	render(){ 
	
		return(	
		<div className="App container">
		<Button color="primary" onClick={this.toggleNewBookingModal.bind(this)} className="my-3">Add Booking</Button>
		<Modal isOpen={this.state.newBookingModal} toggle={this.toggleNewBookingModal.bind(this)}>
			<ModalHeader toggle={this.toggleNewBookingModal.bind(this)}>Add a new booking</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="guests">Guests</Label>
					<Input id="guests" value={this.state.newBookingData.guests} onChange={(e) => {
					let { newBookingData } = this.state;

					newBookingData.guests = e.target.value;

					this.setState({ newBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="roomId">Room Id</Label>
					<Input id="roomId" value={this.state.newBookingData.roomId} onChange={(e) => {
					let { newBookingData } = this.state;

					newBookingData.roomId = e.target.value;

					this.setState({ newBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="checkIn">CheckIn</Label>
					<Input type="date"id="checkIn" value={this.state.newBookingData.checkIn} onChange={(e) => {
					let { newBookingData } = this.state;

					newBookingData.checkIn = e.target.value;

					this.setState({ newBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="checkOut">Checkout</Label>
					<Input type="date" id="checkOut" value={this.state.newBookingData.checkOut} onChange={(e) => {
					let { newBookingData } = this.state;

					newBookingData.checkOut = e.target.value;

					this.setState({ newBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="totalPrice">Total Price</Label>
					<Input id="totalPrice" value={this.state.newBookingData.totalPrice} onChange={(e) => {
					let { newBookingData } = this.state;

					newBookingData.totalPrice = e.target.value;

					this.setState({ newBookingData });
					}} />
				</FormGroup>

			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={this.addBooking.bind(this)}>Add Booking</Button>{' '}
				<Button color="secondary" onClick={this.toggleNewBookingModal.bind(this)}>Cancel</Button>
        	</ModalFooter>
		</Modal>
			</div>
			
		);
	}
}
export default AddBooking;