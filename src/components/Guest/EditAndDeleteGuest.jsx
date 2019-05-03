import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class EditAndDeleteGuest extends Component{
	
	state = {
		editGuestData: {
			id:'',
			firstName: '',
			middleName: '',
			lastName: '',
			birthDate: ''
		},
		editGuestModal: false
	}
	componentWillMount(){
		this._refreshGuests();
	}
	toggleEditGuestModal() {
		this.setState({
		  editGuestModal: ! this.state.editGuestModal
		});
	  }
	updateGuest() {
		let { firstName, middleName, lastName, birthDate } = this.state.editGuestData;
	
		axios.put("http://localhost:8080/HotelBooking/rest/guests/" + this.state.editGuestData.id, {
			firstName, middleName, lastName, birthDate
		}).then((response) => {
			console.log(response.data)
	this.setState({
			  editGuestModal: false, editGuestData: { id: '', firstName: '', middleName: '', lastName: '', birthDate: '' }
			})
			
		});
	}
	editGuest(id, firstName, middleName, lastName, birthDate) {
		this.setState({
			editGuestData: { id, firstName, middleName, lastName, birthDate }, editGuestModal: ! this.state.editGuestModal
		});
	}
	deleteGuest(id) {
		axios.delete("http://localhost:8080/HotelBooking/rest/guests/" + id).then((response) => {
			this._refreshGuests();
		});
		}
	_refreshGuests() {
	axios.get("http://localhost:8080/HotelBooking/rest/guests").then((response) => {
		this.setState({
		guests: response.data
		})
	});
	}
	render(){ 
	
		return(	
			<div>
		<Button color = "success" size="md"className="mr-2" onClick={this.editGuest.bind(this, 
				this.props.guest.id, this.props.guest.firstName, this.props.guest.middleName, 
				this.props.guest.lastName, this.props.guest.birthDate)}>
				Edit
		</Button>
		<Button color = "danger" size="md" onClick={this.deleteGuest.bind(this, this.props.guestId)}>Delete</Button>
        	
		<Modal isOpen={this.state.editGuestModal} toggle={this.toggleEditGuestModal.bind(this)}>
			<ModalHeader toggle={this.toggleEditGuestModal.bind(this)}>Edit a new guest</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="firstName">First Name</Label>
					<Input id="firstName" value={this.state.editGuestData.firstName} onChange={(e) => {
						let { editGuestData } = this.state;

						editGuestData.firstName = e.target.value;

						this.setState({ editGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="middleName">Middle Name (Optional)</Label>
					<Input id="middleName" value={this.state.editGuestData.middleName} onChange={(e) => {
					let { editGuestData } = this.state;

					editGuestData.middleName = e.target.value;

					this.setState({ editGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="lastName">Last Name</Label>
					<Input id="lastName" value={this.state.editGuestData.lastName} onChange={(e) => {
					let { editGuestData } = this.state;

					editGuestData.lastName = e.target.value;

					this.setState({ editGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="birthDate">birthDate</Label>
					<Input type="date" id="birthDate" value={this.state.editGuestData.birthDate} onChange={(e) => {
					let { editGuestData } = this.state;

					editGuestData.birthDate = e.target.value;

					this.setState({ editGuestData });
					}} />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
			<Button color="primary" onClick={this.updateGuest.bind(this)}>Update Guest</Button>{' '}
			<Button color="secondary" onClick={this.toggleEditGuestModal.bind(this)}>Cancel</Button>
			</ModalFooter>
    	</Modal>
			</div>
		);
	}
}
export default EditAndDeleteGuest;