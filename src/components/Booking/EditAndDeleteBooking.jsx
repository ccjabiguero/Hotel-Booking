import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class EditAndDeleteBooking extends Component{
	
	state = {
		editBookingData: {
			id:'',
			guests: '',
			roomId: '',
			checkIn: '',
      checkOut: '',
      totalPrice: ''
		},
		editBookingModal: false
	}
	componentWillMount(){
		this._refreshBookings();
	}
	toggleEditBookingModal() {
		this.setState({
		  editBookingModal: ! this.state.editBookingModal
		});
	  }
	updateBooking() {
		let { guests, roomId, checkIn, checkOut, totalPrice } = this.state.editBookingData;
	
		axios.put("http://localhost:8080/HotelBooking/rest/bookings/" + this.state.editBookingData.id, {
			guests, roomId, checkIn, checkOut, totalPrice
		}).then((response) => {
			console.log(response.data)
			this.setState({
			  editBookingModal: false, editBookingData: { id: '', guests: '', roomId: '', checkIn: '', checkOut: '', totalPrice: '' }
			})
			
		});
	}
	editBooking(id, guests, roomId, checkIn, checkOut, totalPrice) {
		this.setState({
			editBookingData: { id, guests, roomId, checkIn, checkOut, totalPrice }, editBookingModal: ! this.state.editBookingModal
		});
	}
	deleteBooking(id) {
		axios.delete("http://localhost:8080/HotelBooking/rest/bookings/" + id).then((response) => {
			this._refreshBookings();
		});
		}
	_refreshBookings() {
	axios.get("http://localhost:8080/HotelBooking/rest/bookings").then((response) => {
		this.setState({
		bookings: response.data
		})
	});
	}
	render(){ 
	
		return(	
			<div>
		<Button color = "success" size="md"className="mr-2" onClick={this.editBooking.bind(this, 
				this.props.booking.id, this.props.booking.guests, this.props.booking.roomId, 
				this.props.booking.checkIn, this.props.booking.checkOut, this.props.booking.totalPrice)}>
				Edit
		</Button>
		<Button color = "danger" size="md" onClick={this.deleteBooking.bind(this, this.props.bookingId)}>Delete</Button>
        	
		<Modal isOpen={this.state.editBookingModal} toggle={this.toggleEditBookingModal.bind(this)}>
			<ModalHeader toggle={this.toggleEditBookingModal.bind(this)}>Edit a new booking</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="guests">Guests</Label>
					<Input id="guests" value={this.state.editBookingData.guests} onChange={(e) => {
						let { editBookingData } = this.state;

						editBookingData.guests = e.target.value;

						this.setState({ editBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="roomId">Room Id</Label>
					<Input id="roomId" value={this.state.editBookingData.roomId} onChange={(e) => {
					let { editBookingData } = this.state;

					editBookingData.roomId = e.target.value;

					this.setState({ editBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="checkIn">Check In</Label>
					<Input type="date" id="checkIn" value={this.state.editBookingData.checkIn} onChange={(e) => {
					let { editBookingData } = this.state;

					editBookingData.checkIn = e.target.value;

					this.setState({ editBookingData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="checkOut">Check Out</Label>
					<Input type="date" id="checkOut" value={this.state.editBookingData.checkOut} onChange={(e) => {
					let { editBookingData } = this.state;

					editBookingData.checkOut = e.target.value;

					this.setState({ editBookingData });
					}} />
				</FormGroup>
                <FormGroup>
					<Label for="totalPrice">Total Price</Label>
					<Input id="totalPrice" value={this.state.editBookingData.totalPrice} onChange={(e) => {
					let { editBookingData } = this.state;

					editBookingData.totalPrice = e.target.value;

					this.setState({ editBookingData });
					}} />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
			<Button color="primary" onClick={this.updateBooking.bind(this)}>Update Booking</Button>{' '}
			<Button color="secondary" onClick={this.toggleEditBookingModal.bind(this)}>Cancel</Button>
			</ModalFooter>
    	</Modal>
			</div>
		);
	}
}
export default EditAndDeleteBooking;