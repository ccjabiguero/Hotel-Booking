import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div className="App container">
      <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>Book a room</CardTitle>
          <Button>BOOK</Button>
        </Card>
      </Col>
      <Col sm="6">
      <Card body>
          <CardTitle>Room availability</CardTitle>
          <Button>View details</Button>
        </Card>
        
      </Col>
    </Row>
    
    <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>Latest bookings</CardTitle>
          <Button>View details</Button>
        </Card>
      </Col>
      <Col sm="6">
        <Card body>
          <CardTitle>Confirmed Bookings</CardTitle>
          <Button>View details</Button>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col sm="6" >
      <Card body>
          <CardTitle>Guests</CardTitle>
          <CardText>expected for today (date)</CardText>
          <Button>View details</Button>
        </Card>
      </Col>
    </Row>
    </div>
      // <div className="my-app">
      //  <h1>Homepage</h1><hr/>
      //  <h2>Book a room</h2>
      //  <h2>Guests</h2><p>expected for today</p>
      //  <h2>Latest bookings</h2>
      //  <h2>Confirmed bookings</h2>
      //  <h2>Room Availability</h2>
      //  <h2></h2>
      // </div>
    );
  }
}

export default Home;
