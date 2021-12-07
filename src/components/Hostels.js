import React, { Component } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";  //importing the card list group
import Card from "react-bootstrap/Card";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import StarRating from "react-bootstrap-star-rating"





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
<Card bg="dark" style={{width:"25rem", borderRadius:"2rem", minWidth:"30rem", maxWidth:"30rem", minHeight:"7rem", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <Card.Header className="text-center text-light" as="h4" >{name} <Badge style={{borderRadius:"1rem"}} className="bg-info align-right" >{(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}</Badge> </Card.Header>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
      <Card.Body className="bg-light">
      <Card.Title className="text-center" >{address}</Card.Title>
      <Card.Subtitle className="text-sm text-muted text-center">{email}</Card.Subtitle>
      <Card.Text className="text-center">Lat : {location.lat} Long : {location.long}</Card.Text>
      //calculate number of stars from the average ratings and show them in the card
      <Card.Text className="text-center">{StarRating}</Card.Text>           
      <Card.Text className="truncate" style={{margin:"3px"}}>{description}</Card.Text>
      <Card.Header className="text-center" as="h4" >Reviews</Card.Header>
      <ListGroup className="list-group-flush">{reviews.map(review => <ListGroup.Item>{review.reviewer} {review.review}</ListGroup.Item>)}</ListGroup>        
      <Card.Text style={{margin:"3px"}}>Average Rating : {(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}</Card.Text>  
    </Card.Body>
    <Card.Footer bg="dark" className="text-white text-center">
    <ButtonGroup><Button href={`mailto:${email}`}>Email</Button><Button href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}>Map</Button><Button onClick={() => this.addReview(id)}>Add Review</Button>
    <Button>Details</Button></ButtonGroup></Card.Footer>
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
    return this.state.allHostels.map((data, i) => {
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