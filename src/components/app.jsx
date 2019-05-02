import React, { Component } from 'react';
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../index.css'
import Home from './home.jsx';
import Guests from './Guest/guests.jsx';
import Rooms from './Room/rooms.jsx';
import Bookings from './Booking/bookings.jsx';
import Notfound from './notfound.jsx'

class App extends Component {
     constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // render the component based on current or selected mode
  render() {
    return (
        <Router>
        <div>
        <Navbar className="header" light expand="md">
          <NavbarBrand href="/">Hotel Booking System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem><Link to={'/'} className="nav-link"> Home </Link></NavItem>
                    <NavItem><Link to={'/bookings'} className="nav-link">Bookings</Link></NavItem>
                    <NavItem><Link to={'/guests'} className="nav-link">Guests</Link></NavItem>
                    <NavItem><Link to={'/rooms'} className="nav-link">Rooms</Link></NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </div> 
            
        <hr />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/bookings' component={Bookings} />
            <Route path='/rooms' component={Rooms} />
            <Route path='/guests' component={Guests} />
            <Route component={Notfound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
