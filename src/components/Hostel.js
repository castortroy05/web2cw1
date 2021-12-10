import React, { Component } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";  //importing the card list group
import Card from "react-bootstrap/Card";
import { Badge, Button, ButtonGroup, Carousel } from "react-bootstrap";
import ReactStars from "react-stars"
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import DataTable from 'react-data-table-component';

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
  
<Card bg="dark" className="shadow-lg" style={{width:"33%", borderRadius:"2rem", minWidth:"80%", maxWidth:"80%", minHeight:"7rem"}}>
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
      <Carousel variant="dark" interval={null}  indicators={false} >
        <Carousel.Item>
      <Card.Body className="d-flex bg-light flex-column align-items-left" style={{display:"flex", flexDirection:"column"}} >
      <Card.Title className="text-center" >{address}</Card.Title>
      <Card.Subtitle className="text-sm text-muted text-center ">{email}</Card.Subtitle>
      {/* <Card.Text className="text-center">Lat : {location.lat} Long : {location.long}</Card.Text> */}
      <Card.Text className="truncate" style={{margin:"3px", display:"flex", flexDirection:"row",}}>{description}</Card.Text>
      </Card.Body>
      </Carousel.Item>
      <Carousel.Item>
      <Card.Body className="d-flex bg-light flex-column align-items-left" style={{display:"flex", flexDirection:"column"}} >
      <Card.Header className="text-center" as="h4" >Reviews</Card.Header>       
      <DataTable className="d-flex align-left flex-column" style={{display:"flex", flexDirection:"column"}}
        columns={[
          {
            name: 'Reviewer',
            selector: 'reviewer',
            sortable: true,
          },
          {
            name: 'Review',
            selector: 'review',
            sortable: true,
          },
        ]}
        data={reviews}
        pagination={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        highlightOnHover={true}
        pointerOnHover={true}
        striped={true}
        dense={true}
        selectableRows={false}
        customStyles={
          {
            rows: {
              style: {
                minHeight: '5rem',
                maxHeight: '5rem',
                borderRadius: '2rem',
                minWidth: '30rem',
                maxWidth: '30rem',
                minHeight: '7rem',
                maxHeight: '7rem',
              },
            },
          }
        }/>
        
        <form className="d-flex align-left flex-column" style={{display:"flex", flexDirection:"column"}}>
        <label className="text-center" htmlFor="review">Review</label>
        <textarea className="form-control" id="review" rows="3" placeholder="Enter your review here"></textarea>
        <label className="text-center" htmlFor="reviewer">Reviewer</label>
        <input className="form-control" id="reviewer" placeholder="Enter your name here"></input>
        <Button className="btn-primary" onClick={()=>{
          console.log('review is ' + document.getElementById('review').value + " " + document.getElementById('reviewer').value)
          let review = document.getElementById('review').value;
          let reviewer = document.getElementById('reviewer').value;
          this.addReview(this.getHostelId(), review, reviewer);
          
        }}>Submit</Button>
        </form>
        </Card.Body>
        </Carousel.Item>
      <Carousel.Item>
      <Card.Body className="d-flex bg-light flex-column align-items-left" style={{display:"flex", flexDirection:"column"}} >
      <Bar      
        datasetIdKey="id"
        data={{
          labels: [1,2,3,4,5],
          datasets: [
            {              
              label: "Ratings",
              backgroundColor: "rgba(203,124,20,0.2)",
              borderColor: "rgba(255,165,0,1)",
              
              borderWidth: 1,
              barThickness: "flex",
              hoverBackgroundColor: "rgba(235,66,5,0.4)",
              hoverBorderColor: "rgba(255,165,5,1)",
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
        />
        <form className="d-flex align-left flex-column" style={{display:"flex", flexDirection:"column"}}>
        <label className="text-center" htmlFor="rating">Rating</label>
        <input className="form-control" id="rating" type="number" min="1" max="5" placeholder="Enter your rating here" />
        </form>
        
        </Card.Body>
      </Carousel.Item>
      </Carousel>     
    <Card.Text></Card.Text></Card.Body>
    <Card.Footer bg="dark" className="text-white text-center">
    <ButtonGroup><Button variant="success" className="fa fa-envelope" href={`mailto:${email}`}></Button><Button className="fa fa-map" href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}></Button><Button className="fa fa-plus" onClick={() => this.addReview(id)}></Button>
    <Button className="fa fa-eye"></Button></ButtonGroup></Card.Footer>
  </Card>

);
addReview(id, review, reviewer) {
  console.log(id, review, reviewer);
    axios.post('http://localhost:3001/hostels/review/'+id+'', {
    reviewer: reviewer,
    review: review
  })
  .then(res => {
    console.log(res);
    window.location.href = '/hostels';
    // window.location.reload();
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
        <div className="container-fluid">
                <div className="justify-content-center card-group gap-4">{this.allHostels()}</div>
        </div>
        
                        

                        
                
                       
      </div>
    );
  }
}
 
export default Hostels;