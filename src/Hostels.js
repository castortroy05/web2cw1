import React, { Component } from "react";
import axios from 'axios';
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataTable from './components/hostels-data'
import { CardGroup } from "react-bootstrap";


class Hostels extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allHostels: [] };
}

  componentDidMount() {
    axios.get('http://localhost:3001/hostels/?')
        .then(res => {
            this.setState({ allHostels: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
}
CardView = ({
  name = "Default Title",
  address = "Default Text",
  description = "default text",
  email= "default@email"
}) => (
  <Card style={{flex:1}}>
    <Card.Header as="h5">{name}</Card.Header>
    <Card.Body>
      <Card.Title>{address}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer bg="dark" className="text-white">{email}</Card.Footer>
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
      



        <div className="container">
          
                <div>
                <Row xs={1} md={2} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                    <Col>{this.allHostels()}</Col>))}
                    </Row>
                 </div> 
                
                
                <div>
               <Container>
               <Row xs={1} md={2} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                    <Col><CardGroup style={{display: 'flex', flexDirection: 'column'}} >{this.allHostels()}</CardGroup></Col>))}
                    </Row>
                  
                </Container>

                    {/* <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Address</td>
                                <td>Postcode</td>
                                <td>Email</td>
                                <td>Description</td>                              
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table> */}
                </div>
            </div>
        

        
      </div>
    );
  }
}
 
export default Hostels;