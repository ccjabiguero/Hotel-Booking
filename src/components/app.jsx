import React, { Component } from 'react';
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
  render() {
    return (
        <Router>
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Hotel Booking System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem><li><Link to={'/'} className="nav-link"> Home </Link></li></NavItem>
                    <NavItem><li><Link to={'/bookings'} className="nav-link">Bookings</Link></li></NavItem>
                    <NavItem><li><Link to={'/guests'} className="nav-link">Guests</Link></li></NavItem>
                    <NavItem><li><Link to={'/rooms'} className="nav-link">Rooms</Link></li></NavItem>
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
