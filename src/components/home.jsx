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
    );
  }
}

export default Home;
