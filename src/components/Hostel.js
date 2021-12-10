import React, { Component } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";  //importing the card list group
import Card from "react-bootstrap/Card";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import ReactStars from "react-stars"
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'

class Hostels extends Component {
  
  constructor(props) {
    super(props);
    this.state = { hostel: [] };
}


//get hostel id from the url
  getHostelId() {
    const url = window.location.href;
    const hostelId = url.substring(url.lastIndexOf('/') + 1);
    console.log(hostelId);
    return hostelId;
  }

  


//use param to load a hostel

   componentDidMount() {
     console.log('page loaded')
    axios.get('http://localhost:3001/hostels/'+this.getHostelId())
        .then(res => {
            this.setState({ hostel: res.data });
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
<Card bg="dark" className="shadow-lg" style={{width:"25rem", borderRadius:"2rem", minWidth:"30rem", maxWidth:"30rem", minHeight:"7rem"}}>
      <Card.Header className="text-center d-flex flex-column align-items-center text-light" as="h4" >{name}<Badge style={{borderRadius:"1rem", display:"flex"}} className="bg-dark ms-2" ><ReactStars
        count={5}
        value={(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}
        size={24}
        color2={'#ffd700'}
        edit={false}
      /></Badge> </Card.Header>
      {/* <iframe title="location" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAiNObb6o1jwa00ryO1xpEqL0VFF7yk5Ls&q=${location.lat},${location.long}`} width="100%" height="200" frameborder="0" style={{border:0}} allowfullscreen></iframe> */}
      {/* <Card.Img variant="top" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" /> */}
      <Card.Body className="bg-light">
      <Card.Title className="text-center" >{address}</Card.Title>
      <Card.Subtitle className="text-sm text-muted text-center ">{email}</Card.Subtitle>
      {/* <Card.Text className="text-center">Lat : {location.lat} Long : {location.long}</Card.Text> */}
      <Card.Text className="truncate" style={{margin:"3px"}}>{description}</Card.Text>
      <Card.Header className="text-center" as="h4" >Reviews</Card.Header>
      <ListGroup variant="flush">
      {reviews.map((review, index) => (
        <ListGroup.Item key={index}>
          <div className="row">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <p className="text-muted">{review.reviewer}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <p className="text-muted">{review.review}</p>
            </div>
          </div>
        </ListGroup.Item>
      ))}
      </ListGroup>
      <Card.Footer className="text-center">
      <ButtonGroup className="text-center" aria-label="Basic example">
        <Button variant="outline-info" onClick={() => this.props.history.push(`/hostels/${id}`)}>View</Button>
        <Button variant="outline-info" onClick={() => this.props.history.push(`/hostels/${id}/review`)}>Add Review</Button>
      </ButtonGroup></Card.Footer>

      {/* <ListGroup className="list-group-flush">{reviews.map(review => <ListGroup.Item>{review.reviewer} {review.review}</ListGroup.Item>)}</ListGroup>        
      <Card.Text style={{margin:"3px"}}>Average Rating : {(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}</Card.Text> */}
      <Bar      
        datasetIdKey="id"
        data={{
          labels: [1,2,3,4,5],
          datasets: [
            {              
              label: "Ratings",
              backgroundColor: "rgba(255,0,255,0.2)",
              borderColor: "rgba(255,0,255,1)",
              
              borderWidth: 1,
              barThickness: "flex",
              hoverBackgroundColor: "rgba(255,0,255,0.4)",
              hoverBorderColor: "rgba(255,0,255,1)",
              data: [
                ratings.filter(rating => rating === 1).length,  
                ratings.filter(rating => rating === 2).length,
                ratings.filter(rating => rating === 3).length,
                ratings.filter(rating => rating === 4).length,
                ratings.filter(rating => rating === 5).length
              ]              
            }
          ]
        }}  
        /><Card.Text></Card.Text>
    </Card.Body>
    <Card.Footer bg="dark" className="text-white text-center">
    <ButtonGroup><Button variant="success" className="fa fa-envelope" href={`mailto:${email}`}></Button><Button className="fa fa-map" href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}></Button><Button className="fa fa-plus" onClick={() => this.addReview(id)}></Button>
    <Button className="fa fa-eye"></Button></ButtonGroup></Card.Footer>
  </Card>
);
addReview(id) {
  console.log(id);
  //using bootstrap modal to add a review to the hostel
    axios.post('http://localhost:3001/hostels/'+id+'/reviews', {
    reviewer: "John",
    review: "This is a review"
  })
  .then(res => {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  })

}

  allHostels() {
    return this.state.hostel.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}
  render() {
    return (
      <div>
        <h1>Hostels</h1>
      



        <div className="container-fluid">
                <div className="justify-content-center card-group gap-4">{this.allHostels()}</div>
        </div>
        
                        

                        
                
                       
      </div>
    );
  }
}
 
export default Hostels;