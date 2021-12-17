import React, { Component, useEffect, useState, setState } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import dateformat from 'dateformat';
import { Badge, Button, ButtonGroup, CardGroup } from "react-bootstrap";



class Itineraries extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allItineraries: [], allHostels: [], filteredHostels: [] };
}


  componentDidMount() {
    axios.get('http://localhost:3001/itineraries/?')
        .then(res => {
            this.setState({ allItineraries: res.data });
            this.getAllHostels();
            // console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}


getAllHostels() {
    axios.get('http://localhost:3001/hostels/?')
        .then(res => {
            this.setState({ allHostels: res.data });
            this.allHostels= res.data;
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}



getHostelName(id) {
  console.log('id being loaded '+id);
  console.log('array of all hostels ' + JSON.stringify(this.state.allHostels))
  // setState(this.filteredHostels)
  this.state.allHostels.map((hostel, i) => {
    if (hostel.id === id.toString()) {
      console.log('hostel name ' + hostel.name);
      this.state.filteredHostels = hostel 
    }
  });
  //console.log('filtered hostel ' + JSON.stringify(this.filteredHostels));
  return this.state.filteredHostels.name;
}


  // axios.get('http://localhost:3001/hostels/' + id)
  //     .then(res => {
  //         // this.setState({ allHostels: res.data });
  //         this.filteredHostels= res.data[0];
  //         console.log('data loaded ' + res.data[0].name);
  //         console.log('filtered to ' + this.filteredHostels.name);
  //         return this.filteredHostels.name
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     })
// console.log('return this ' + this.filteredHostels);

  
  
// }
    
CardView = ({
  user = "Default Title",
  startdate = Date.now(),
  stages = [],
  hostelName = "Default Text",
  dateDisplay = dateformat(startdate, "dddd, mmmm dS, yyyy"),
    
  
  }) => (
    <Card bg="dark" text="white" style={{width:"25rem", boxShadow:"0.5rem 1rem 1rem rgba(0, 0, 0, 0.5)", borderRadius:"2rem", minWidth:"25rem", maxWidth:"25rem", minHeight:"30rem"}}>
    <Card.Title className="text-center" as="h4">{user}</Card.Title>    
    <Card.Subtitle className="text-sm text-muted text-center">{dateDisplay}</Card.Subtitle>
    <Card.Body className="bg-light text-dark"> 
    <ListGroup variant="outline" className="">
        {stages.map(stage => (
          
          <Card.Body className="" style={{marginTop:"0.5rem"}} >
          {/* <Card.Header className="text-center" as="h4" >Stage {stage.stage}</Card.Header> */}
          <Card.Header className="text-center d-flex flex-column align-items-center text-dark">{this.getHostelName(stage.hostel)}<Badge className="row align-right" pill="primary">Stage {stage.stage} </Badge>  </Card.Header>  
          {/* <Card.Subtitle className="text-left">Hostel ID : {stage.hostel} </Card.Subtitle> */}
          <Card.Text className="text-center " >Number of Nights : {stage.nights}</Card.Text>
          <Card.Footer className="text-center">
          <ButtonGroup className="text-center" aria-label="Basic example">
            <Button className="text-center" variant="danger" onClick={() => this.deleteStage(stage.id)} size="sm">Delete</Button>
          </ButtonGroup>
          </Card.Footer>
          </Card.Body>
          
          )
        )
        }
      </ListGroup>
    </Card.Body>{/* 
           */}
    
    <Card.Footer className="text-center">
    <ButtonGroup>
    <Button variant="warning" onClick={() => this.editItinerary(stages.id)} size="sm">Edit</Button>
    <Button variant="danger" onClick={() => this.deleteItinerary(stages.id)} size="sm">Delete</Button>
    </ButtonGroup>
    </Card.Footer>





          
  </Card>
);

//direct to the new itinerary page
newItinerary = () => {
  console.log('new itinerary');
  //load the newItinerary component
  window.location.href = '/newItinerary';


}


addStage(hostelid, user, startdate, nights) {
  console.log(hostelid, user, startdate, nights);
    axios.post('http://localhost:3001/itineraries/stages/new/'+user+'', {
    hostelid: hostelid,
    nights: nights
  })
  .then(res => {
    console.log('review response '+res);
    this.setState({
      filteredHostels: this.state.allHostels})
      this.allHostels();
      console.log('state updated');

    //window.location.href = '/hostels';
    // window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  })
}

deleteStage(id) {
  console.log('id being deleted '+id);
  axios.delete('http://localhost:3001/itineraries/'+id+'')
  .then(res => {
    console.log('review response '+res);
    this.setState({
      filteredHostels: this.state.allHostels})
      this.allHostels();
      console.log('state updated');
    })
  .catch(function (error) {
    console.log(error);
  })
}

editStage(id) {
  console.log('id being edited '+id);
  axios.get('http://localhost:3001/itineraries/'+id+'')
  .then(res => {
    console.log('review response '+res);
    this.setState({
      filteredHostels: this.state.allHostels})
      this.allHostels();
      console.log('state updated');
    })
  .catch(function (error) {
    console.log(error);
  })
}

deleteItinerary(id) {
  console.log('id being deleted '+id);
  axios.delete('http://localhost:3001/itineraries/'+id+'')
  .then(res => {
    console.log('review response '+res);
    this.setState({
      filteredHostels: this.state.allHostels})
      this.allHostels();
      console.log('state updated');
    })
  .catch(function (error) {
    console.log(error);
  })
}


editItinerary(id) {
  console.log('id being edited '+id);
  axios.get('http://localhost:3001/itineraries/'+id+'')
  .then(res => {
    console.log('review response '+res);
    this.setState({
      filteredHostels: this.state.allHostels})
      this.allHostels();
      console.log('state updated');
    })
  .catch(function (error) {
    console.log(error);
  })
}





allItineraries() {
    return this.state.allItineraries.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}

  render() {

    return (
      <div className="container">
      <div className="row justify-content-center">
      <Card classname="align-center" style={{width:"25rem", borderWidth:"0" ,borderRadius:"2rem", minWidth:"30rem", maxWidth:"30rem", backgroundColor:"inherit", borderColor:"backgroundColor",}} >
        <Card.Title className="text-center">Create a new Itinerary</Card.Title>
        <Card.Body>
        <Card.Text className="text-center">
        <Button variant="success" onClick={() => this.newItinerary()} size="sm">Add</Button>
        

        
        
        </Card.Text></Card.Body>
        </Card>

      
      <div className="container-fluid">
      <div className="justify-content-center card-group gap-4">
      </div> 

     <div className="justify-content-center card-group gap-4">{this.allItineraries()}</div>
      </div>
      </div>
      </div>
    );
  }
      
    




}
 
export default Itineraries;