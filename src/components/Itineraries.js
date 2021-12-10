import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Hostels from "./Hostels";  
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import DataTable from 'react-data-table-component';


class Itineraries extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allItineraries: [], allHostels: [], filteredHostels: [] };
}


  componentDidMount() {
    axios.get('http://localhost:3001/itineraries/?')
        .then(res => {
            this.setState({ allItineraries: res.data });
            // console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

//load hostel data from the hostels component function allHostels() and save it to the state
//   componentDidUpdate(prevProps, prevState) {
//     axios.get('http://localhost:3001/hostels/?')
//         .then(res => {
//             this.setState({ allHostels: res.data });
//             console.log(res.data);            
//         })
//         .catch(function (error) {
//             console.log(error);

//         })
// }

getAllHostels() {
    axios.get('http://localhost:3001/hostels/?')
        .then(res => {
            // this.setState({ allHostels: res.data });
            this.allHostels= res.data;
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}



getHostelName(id) {
  console.log(id);
  console.log(this.allHostels)
  axios.get('http://localhost:3001/hostels/' + id)
      .then(res => {
          // this.setState({ allHostels: res.data });
          this.filteredHostels= res.data[0];
          console.log(res.data[0]);
          console.log(this.filteredHostels);
          return this.filteredHostels
      })
      .catch(function (error) {
          console.log(error);
      })
console.log('return this ' + this.filteredHostels);

  
  
}
    
CardView = ({
  user = "Default Title",
  startdate = "Default Text",
  stages = [],
  
  }) => (
    //get the hostelName using the getHostelName function
    <Card className="col-md-4">
      <Card.Header>
        <Card.Title>{user}</Card.Title>
      </Card.Header>  <Card.Body>
        <Card.Text>
          {startdate}
        </Card.Text>
        <Card.Text>
          {stages.map(stage => (
            <div>
              <h5>Hostel ID {stage.hostel}</h5>
              <p>Number of Nights {stage.nights}</p> 
              <p>Hostel : {this.getHostelName(stage.hostel)}</p> 
           </div>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
    
//     <Card bg="info" text="white" className="text-center" style={{width:"25rem", borderRadius:"5%", minWidth:"25rem", maxWidth:"25rem", minHeight:"30rem"}}>
//     <Card.Title className="text-center" as="h4">{user}</Card.Title>    
//     <Card.Subtitle className="text-sm text-muted text-center">{startdate}</Card.Subtitle>
//     <Card.Body className="bg-light text-dark"> 
    
//     <DataTable
//       title="Stages"
//     columns={[
//       {
//         name: 'Hostel ID',
//         selector: (stages) => stages.hostel,
//         sortable: true,
//       },
//       {
//         name: 'Hostel Name',
//         selector: (stages) => stages.hostelName,
//         sortable: true,
//       },
//       {
//         name: 'Nights',
//         selector: (stages) => stages.nights,
//       },
//     ]}
//     data={stages}
//     pagination={true}
//         paginationPerPage={5}
//         paginationRowsPerPageOptions={[5, 10, 15]}
//         highlightOnHover={true}
//         pointerOnHover={true}
//         striped={true}
//         dense={true}
//         selectableRows={false}
//         customStyles={
//           {
//             rows: {
//               style: {
//                 minHeight: '5rem',
//                 maxHeight: '5rem',
//                 borderRadius: '2rem',
//                 maxWidth: '30rem',
//                 minHeight: '7rem',
//                 maxHeight: '7rem',
//               },
//             },
//           }
//         }

//     />

//         {/* <ListGroup variant="flush">
//         {stages.map(stage => (
//           //put edit and delete buttons for each stage beside the stage name
//           <ListGroup.Item>          
//           Hostel :   Hostel ID : {stage.hostel} - Number of Nights : {stage.nights}
//           </ListGroup.Item>
//         ))}
//       </ListGroup> */}
//     </Card.Body>
    
//     <Card.Footer className="text-center">
//     <ButtonGroup>
//     <Button variant="outline-secondary" size="sm">Edit</Button>
//     <Button variant="outline-secondary" size="sm">Delete</Button>
//     </ButtonGroup>
//     </Card.Footer>





          
//   </Card>
// );

allItineraries() {
    return this.state.allItineraries.map((data, i) => {
        return <this.CardView key={i} {...data} />;
    });
}

  render() {
window.onload = this.getAllHostels();    
    return (
      <div className="container-fluid">
      <div className="justify-content-center card-group gap-3">{this.allItineraries()}</div>
</div>
    );
  }
}
 
export default Itineraries;