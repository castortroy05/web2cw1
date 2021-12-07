import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";


 
class About extends Component {

render()
  {const style = {
     width: '25rem',
     height: '40rem',
                  }
      
    return (
      <Container>
        <Card style={{width:"27rem", height:"45rem" }}>
          <Card.Header>About</Card.Header>
          <Card.Body className="text-center"> 
             <Map className="map"
                google={this.props.google}
                zoom={8}
                style={style}
                initialCenter={{ lat: 55.87999938760207, lng: -3.6333030228009777 }}
              />
              <Card.Text> </Card.Text>
              <Card.Text> </Card.Text>
              <Card.Text> </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
      
}
 
export default GoogleApiWrapper({
    resetBoundsOnResize: true,
    apiKey: ('AIzaSyDhcNsNAkCToiEoqD6OHKDGplxz-Yk3e-A&')
   })(About);