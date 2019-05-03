import React, {Component} from 'react';
import EditAndDeleteGuest from  './edit_and_delete_guest.jsx'

class GuestRow extends Component{
	// component that renders a single guest
	// see ./guests.jsx
	//guestId is for delete
	render(){
		return(	
			<tr key={this.props.guest.id}>
				<td>{this.props.guest.id}</td>
				<td>{this.props.guest.firstName}</td>
				<td>{this.props.guest.middleName}</td>
				<td>{this.props.guest.lastName}</td>
				<td>{this.props.guest.birthDate}</td>
				<td>
				<EditAndDeleteGuest 
					guest={this.props.guest}
					guestId={this.props.guest.id}/> 
				</td>
			</tr>
		);
	}
}
export default GuestRow;