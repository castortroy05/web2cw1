import React, { Component } from "react";
import axios from 'axios';
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CardGroup } from "react-bootstrap";


class Itineraries extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allItineraries: [] };
}

  componentDidMount() {
    axios.get('http://localhost:3001/itineraries/?')
        .then(res => {
            this.setState({ allHostels: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
}
CardView = ({
  user = "Default Title",
  startdate = "Default Text",
  stages = [stageNo="default"[stage= "Default Text",hostel= "Default Text",hotel= "Default Text"]],
}) => (
  <Card style={{flex:1}}>
    <Card.Header as="h5">{user}</Card.Header>
    <Card.Subtitle>{startdate}</Card.Subtitle>
    <Card.Body>      
      <Card.Text>{stages}</Card.Text>
    </Card.Body>
  </Card>
);

  allHostels() {
    return this.state.allItineraries.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}
  render() {
    return (
      <div>
        <h1>Itineraries</h1>
              <div className="container">
                 <div>
                    <Row xs={1} md={2} className="g-4">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <Col>{this.allItineraries()}</Col>))}
                    </Row>
                 </div>            
                <div>
              </div>
            </div>    
      </div>
    );
  }
}
 
export default Itineraries;