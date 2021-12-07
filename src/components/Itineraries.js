import React, { Component } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Hostels from "./Hostels";  




class Itineraries extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allItineraries: [] };
}

  componentDidMount() {
    axios.get('http://localhost:3001/itineraries/?')
        .then(res => {
            this.setState({ allItineraries: res.data });
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
CardView = ({
  user = "Default Title",
  startdate = "Default Text",
  stages = [],
}) => (
  <Card bg="warning" text="white" className="text-center"
  style={{width:"25rem", borderRadius:"5%", minWidth:"25rem", maxWidth:"25rem", minHeight:"20rem", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
  >
    <Card.Title className="text-center" as="h4">{user}</Card.Title>
    <Card.Subtitle className="text-sm text-muted text-center">{startdate}</Card.Subtitle>
    <Card.Body>    
    <ListGroup variant="flush">
        {stages.map(stage => (
          <ListGroup.Item>
         Hostel ID : {stage.hostel} - Number of Nights : {stage.nights}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
);

allItineraries() {
    return this.state.allItineraries.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}
  render() {
    return (
      <div className="container-fluid">
      <div className="justify-content-center card-group gap-3">{this.allItineraries()}</div>
</div>
    );
  }
}
 
export default Itineraries;