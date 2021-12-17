import React, { Component, useEffect, useState, setState } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import dateformat from 'dateformat';
import { Badge, Button, ButtonGroup, CardGroup } from "react-bootstrap";



class NewItinerary extends Component {
  
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
    
// CardView = ({
//   user = "Default Title",
//   startdate = Date.now(),
//   stages = [],
//   hostelName = "Default Text",
//   dateDisplay = dateformat(startdate, "dddd, mmmm dS, yyyy"),
//   endDate= startdate + (1000 * 60 * 60 * 24 * stages.length),  
  
//   }) => (
//     <Card className="flipInY" bg="dark" text="white" style={{width:"25rem", borderRadius:"5%", minWidth:"25rem", maxWidth:"25rem", minHeight:"30rem"}}>
//     <Card.Title className="text-center" as="h4">{user}</Card.Title>    
//     <Card.Subtitle className="text-sm text-muted text-center">{dateDisplay}</Card.Subtitle>
//     <Card.Body className="bg-light text-dark"> 
//     <ListGroup variant="flush">
//         {stages.map(stage => (
//           <ListGroup.Item>
//           <Card.Title className="text-center" as="h5">Stage {stage.stage}</Card.Title>
//           <Card.Title className="text-center">{this.getHostelName(stage.hostel)}</Card.Title>  
//           <Card.Subtitle className="text-left">Hostel ID : {stage.hostel} </Card.Subtitle>
//           <Card.Text className="text-left">Number of Nights : {stage.nights}</Card.Text>
//           </ListGroup.Item>
//           )
//         )
//         }
//       </ListGroup>
//     </Card.Body>{/* 
//            */}
    
//     <Card.Footer className="text-center">
//     <ButtonGroup>
//     <Button variant="outline-secondary" size="sm">Edit</Button>
//     <Button variant="outline-secondary" size="sm">Delete</Button>
//     </ButtonGroup>
//     </Card.Footer>





          
//   </Card>
// );

addStage(hostelid, user, startdate, nights) {
  console.log(hostelid, user, startdate, nights);
    axios.post('http://localhost:3001/itineraries/new/'+user+'', {
    hostelid: hostelid,
    startdate: startdate,
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




allItineraries() {
    return this.state.allItineraries.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}

  render() {

    return (
      <div className="container">
      <div className="row justify-content-center">
      
      <div className="container-fluid">
      <div className="justify-content-center card-group gap-4">
      <Card bg="warning" text="white" style={{width:"45rem", borderRadius:"2rem", minWidth:"60%", maxWidth:"80%", minHeight:"30rem", }}>
      {/* <div className="row justify-content-center">
      <div className="col-md-6"> */}
      <Card.Title className="text-center" as="h4">Add New Itinerary</Card.Title>
      <Card.Body className="bg-light text-dark">
      
      
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
      <label htmlFor="userName">User</label>
      <input type="text" className="form-control" id="userName" aria-describedby="userName" placeholder="Enter User Name" value={this.state.userName} onChange={this.handleChange} />
      <label className="text-center" htmlFor="startDate">Start Date</label>
      <input type="date" className="form-control" id="startDate" aria-describedby="startDate" placeholder="Enter Start Date" value={this.state.startDate} onChange={this.handleChange} />
      <label htmlFor="hostel">Hostel</label>
      <select className="form-control" id="hostel" value={this.state.hostel} onChange={this.handleChange}>
      <option value="">Select Hostel</option>
      {this.state.allHostels.map((hostel, i) => {
        return <option key={i} value={hostel.id}>{hostel.name}</option>
      })}
      </select>
      <label htmlFor="nights">Number of Nights</label>
      <input type="text" className="form-control" id="nights" aria-describedby="nights" placeholder="Enter Number of Nights" value={this.state.nights} onChange={this.handleChange} />
      </div>
      
      </form> 
      </Card.Body>
      <Card.Footer className="text-center">
      <button type="submit" className="btn btn-primary">Submit</button>
      </Card.Footer>

      </Card>
     </div> 

     {/* <div className="justify-content-center card-group gap-4">{this.allItineraries()}</div> */}
      </div>
      </div>
      </div>
    );
  }
      
    




}
 
export default NewItinerary;