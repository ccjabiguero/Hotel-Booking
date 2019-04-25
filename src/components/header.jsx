import React, {Component} from 'react';
import '../css/header.css';

class Header extends Component{
	render(){
		return(
			<div className="header">
				
				<ul className="nav">
                    <li><a href="#home">HOME</a></li>
					<li><a href="#about">ABOUT US</a></li> 
					<li><a href="#room">ROOM</a></li>
					<li><a href="#offer">OFFERS</a></li> 
                    <li><a href="#reservation">RESERVATION</a></li>
                    <li><a href="#contact">CONTACT US</a></li>
                    <li><input type="button" href="#about" value="BOOK NOW"/></li> 
					<li>{this.props.date}</li>
                </ul>
			</div>
		);
	}
}
export default Header;