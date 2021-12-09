import React, { Component } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";  //importing the card list group
import Card from "react-bootstrap/Card";
import { Accordion ,Badge, Button, ButtonGroup } from "react-bootstrap";
import ReactStars from "react-stars"
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'

class Hostels extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allHostels: [], filteredHostels: [] };
}


//if an id is typed in the address bar, filter the hostels by that id
  
  




   componentDidMount() {
    axios.get('http://localhost:3001/hostels/?')
        .then(res => {
            this.setState({ allHostels: res.data, filteredHostels: res.data });
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
      //use accordian to have the reviews expand 
      {/* <Accordion>
      {reviews.map((review, acc) => (
        <div key={acc}>
        <Accordion.Toggle as={Button} variant="link" eventKey={acc}>
          {review.review}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={acc}>
          <Card.Body>
            <Card.Text>{review.review}</Card.Text>
          </Card.Body>
        </Accordion.Collapse>
      </div>
      ))}
      </Accordion>
      <ButtonGroup className="d-flex justify-content-center">
      <Button variant="outline-light" className="bg-dark" onClick={() => this.props.history.push(`/hostels/${id}`)}>View</Button>
      <Button variant="outline-light" className="bg-dark" onClick={() => this.props.history.push(`/hostels/${id}/edit`)}>Edit</Button>
      <Button variant="outline-light" className="bg-dark" onClick={() => this.props.history.push(`/hostels/${id}/delete`)}>Delete</Button>
      </ButtonGroup> */}
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
    try {
      return this.state.filteredHostels.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
    }
    catch (err) {
      console.log(err);
    }

}

handleSearch = (event) =>{
  
  console.log(event.target.value);
  const search = event.target.value.toLowerCase();
  if(search === ""){
    this.setState({
      filteredHostels: this.state.allHostels

    })
    return;
  }
 
  this.setState({
    filteredHostels: this.state.allHostels.filter(hostel => hostel.name.toLowerCase().includes(search)||hostel.address.toLowerCase().includes(search))
    
  });
  console.log(this.state.filteredHostels);

}




  render() {
    const { allHostels } = this.state;

    return (
      <div>
        <h1>Hostels</h1>
      
        <form className="align-center" style={{ margin: '0 auto' }}><label>Search:</label><input type="text" onChange={(event) =>this.handleSearch(event)} /></form>


        <div className="container-fluid">
          

                <div className="justify-content-center card-group gap-4">{this.allHostels()}</div>
        </div>
        {/* ///create a Modal to add a review for the hostel */}
        {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Review</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">  
                  <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                      <input type="text hidden" id="hostelId" value={this.state.allHostels[0].id} />
                      <input type="text" id="reviewer" placeholder="Enter your name" />
                      <textarea id="review" placeholder="Enter your review" rows="3"></textarea>
                      <input type="number" id="rating" placeholder="Enter your rating" />
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
                    </div>
                    </div>   */}

                            
                        

                        
                
                       
      </div>
    );
  }
}
 
export default Hostels;