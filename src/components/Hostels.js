import React, { Component, useState, useEffect } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";  //importing the card list group
import Card from "react-bootstrap/Card";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import ReactStars from "react-stars"
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import DataTable from 'react-data-table-component';
// import e from "express";
import { Link } from "react-router-dom";

class Hostels extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allHostels: [], filteredHostels: [], reviews: [] };
}

   componentDidMount() {
    axios.get('http://localhost:3001/hostels/?')
        .then(res => {
            this.setState({ allHostels: res.data, filteredHostels: res.data });
            // console.log(res.data);
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
  reviewid="review"+id,
  reviewerid="reviewer"+id,
    
}) => (
<Card bg="dark" className="" style={{width:"25rem", boxShadow:"0.5rem 1rem 1rem rgba(0, 0, 0, 0.5)" , borderRadius:"2rem", minWidth:"30rem", maxWidth:"30rem", minHeight:"7rem", borderWidth:"0"}}>
      <Card.Header className="text-center d-flex flex-column align-items-center text-light" as="h4" >{name}<Badge style={{borderRadius:"1rem", display:"flex"}} className="bg-dark ms-2" ><ReactStars
        count={5}
        value={(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}
        size={24}
        color2={'#ffd700'}
        edit={false}
      /></Badge> </Card.Header>
      <Card.Body  className="bg-light">
      <Card.Text as="h4" className="text-bold text-center" >{address}</Card.Text>
      <Card.Subtitle className="text-sm link text-muted text-center" style={{ margin:"0.5rem", fontFamily:"monospace"}}>      
      <a href={"mailto:"+email}>{email}</a></Card.Subtitle>      
      <Card.Body className="bg-light">
      <Card.Text className="" style={{margin:"5px" , textAlign:"justify", textJustify:"inter-word",}}>{description}</Card.Text>
      </Card.Body>
      <Card.Body className="bg-light">
      
      <Card.Footer className="bg-light">
      
      {reviews.map((review, index) => (
        <Card.Text key={index} className="text-center d-flex flex-column align-items-center " style={{margin:"0.5rem"}}> {review.review}<Badge style={{borderRadius:"1rem", display:"flex"}} className="bg-dark ms-2">{review.reviewer}</Badge></Card.Text>
                       
      ))}
      
      </Card.Footer>
      </Card.Body>
     
{/*       
      <Card.Body>
      <form className="d-flex align-left flex-column" style={{display:"flex", flexDirection:"column"}}>
        <label className="text-center" htmlFor={"review"+id}>Review</label>
        <textarea className="form-control" id={"review"+id} rows="3" placeholder="Enter your review here"></textarea>
        <label className="text-center" htmlFor={"reviewer"+id}>Reviewer</label>
        <input className="form-control" id={"reviewer"+id} placeholder="Enter your name here"></input>
        <Button className="btn-primary" onClick={()=>{
          console.log('review is ' + document.getElementById(reviewid).value + " " + document.getElementById(reviewerid).value)
          let review = document.getElementById(reviewid).value;
          let reviewer = document.getElementById(reviewerid).value;
          this.addReview(id, review, reviewer);
          
        }}>Submit</Button>
        </form>
    </Card.Body> */}
    
    </Card.Body>
    <Card.Footer bg="dark" className="text-white text-center"><ButtonGroup>
    <Link to={`/hostels/${id}`}>
            <Button variant="primary">
                Details
            </Button>
            </Link></ButtonGroup></Card.Footer>
  </Card>
);
addReview(id, review, reviewer) {
  // console.log(id, review, reviewer);
    axios.post('http://localhost:3001/hostels/review/'+id+'', {
    reviewer: reviewer,
    review: review
  })
  .then(res => {
    // console.log('review response '+JSON.stringify(res));
    this.setState({
      filteredHostels: this.state.allHostels})
      this.allHostels();
      // console.log('state updated');
  
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
  
  // console.log(event.target.value);
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
    //const { allHostels } = this.state;

    return (
      <div>
          <div className="container-fluid">
          <div className="row justify-content-center">
        <Card classname="align-center" style={{width:"25rem", borderWidth:"0" ,borderRadius:"2rem", minWidth:"30rem", maxWidth:"30rem", backgroundColor:"inherit", borderColor:"backgroundColor",}} >
        <Card.Title className="text-center">Search for a Hostel</Card.Title>
        <Card.Body>
        <Card.Text className="text-center">
        <form className="align-center" style={{ margin: '0 auto' }}><label></label><input type="text" onChange={(event) =>this.handleSearch(event)} /></form>
        </Card.Text></Card.Body>
        </Card></div>
          

                <div className="justify-content-center card-group gap-4">{this.allHostels()}</div>
        </div>
        
                            
                        

                        
                
                       
      </div>
    );
  }
}
 
export default Hostels;