import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class AddGuest extends Component{
	
	state = {
		newGuestData: {
			firstName: '',
			middleName: '',
			lastName: '',
			birthDate: ''
		},
		newGuestModal: false
	}
	componentWillMount(){
		axios.get("http://localhost:8080/HotelBooking/rest/guests").then((response) => {
		this.setState({
		guests: response.data
		})
	});
	}
	toggleNewGuestModal(){
		this.setState({
			newGuestModal: ! this.state.newGuestModal
		});
	}
	addGuest(){
		axios.post("http://localhost:8080/HotelBooking/rest/guests", this.state.newGuestData).then((response)=>{
		let { guests } = this.state;
			guests.push(response.data);
			this.setState({ guests, newGuestModal: false, newGuestData: {
				firstName: '',
				middleName: '',
				laststName: '',
				birthDate: ''
				}
			}); 
		});
	}

	render(){ 
	
		return(	
		<div className="App container">
		<Button color="primary" onClick={this.toggleNewGuestModal.bind(this)} className="my-3">Add Guest</Button>
		<Modal isOpen={this.state.newGuestModal} toggle={this.toggleNewGuestModal.bind(this)}>
			<ModalHeader toggle={this.toggleNewGuestModal.bind(this)}>Add a new guest</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="firstName">First Name</Label>
					<Input id="firstName" value={this.state.newGuestData.firstName} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.firstName = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="middleName">Middle Name (Optional)</Label>
					<Input id="middleName" value={this.state.newGuestData.middleName} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.middleName = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="lastName">Last Name</Label>
					<Input id="lastName" value={this.state.newGuestData.lastName} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.lastName = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="birthDate">BirthDate</Label>
					<Input type="date" id="birthDate" value={this.state.newGuestData.birthDate} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.birthDate = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>

			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={this.addGuest.bind(this)}>Add Guest</Button>{' '}
				<Button color="secondary" onClick={this.toggleNewGuestModal.bind(this)}>Cancel</Button>
        	</ModalFooter>
		</Modal>
			</div>
			
		);
	}
}
export default AddGuest;