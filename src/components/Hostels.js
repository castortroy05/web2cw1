import React, { Component } from "react";
import axios from 'axios';
import CardColumns from "react-bootstrap/CardColumns";
import ListGroup from "react-bootstrap/ListGroup";  //importing the card list group
import Card from "react-bootstrap/Card";
import { Button, ButtonGroup } from "react-bootstrap";




class Hostels extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allHostels: [] };
}

  componentDidMount() {
    axios.get('http://localhost:3001/hostels/?')
        .then(res => {
            this.setState({ allHostels: res.data });
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
CardView = ({
  id=0,
  name = "Default Title",
  address = "Default Text",
  description = "default text",
  email= "default@email",
  reviews=[],
  ratings=[],
  location= {lat:0, long:0},
}) => (
  <Card bg="success"  
  style={{width:"25rem", borderRadius:"5%", minWidth:"25rem", maxWidth:"25rem", minHeight:"7rem", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
  >
    <Card.Header className="text-center" as="h4" >{name}</Card.Header>
    <Card.Body className="bg-light">
      <Card.Title className="text-center" >{address}</Card.Title>
      <Card.Subtitle className="text-sm text-muted text-center">{email}</Card.Subtitle>
      <Card.Text className="text-center">Lat : {location.lat} Long : {location.long}</Card.Text>
      <Card.Text style={{margin:"3px"}}>{description}</Card.Text>
      <Card.Header className="text-center" as="h4" >Reviews</Card.Header>
      {/* <Card.Text style={{margin:"3px"}}>{reviews.map(review => <div>{review.reviewer} {review.review}</div>)}</Card.Text> */}
      <ListGroup className="list-group-flush">{reviews.map(review => <ListGroup.Item>{review.reviewer} {review.review}</ListGroup.Item>)}
        </ListGroup>
        
        <Card.Text style={{margin:"3px"}}>Average Rating : {(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}</Card.Text>
        
    </Card.Body>
    <Card.Footer bg="dark" className="text-white text-center"><ButtonGroup><Button>Email</Button><Button>Map</Button><Button>Details</Button></ButtonGroup></Card.Footer>
  </Card>
);

  allHostels() {
    return this.state.allHostels.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}
  render() {
    return (
      <div>
        <h1>Hostels</h1>
      



        <div className="container-fluid">
                <div className="justify-content-center card-group gap-3">{this.allHostels()}</div>
        </div>
        

        
      </div>
    );
  }
}
 
export default Hostels;