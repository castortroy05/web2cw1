import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Badge, Button, ButtonGroup } from "react-bootstrap";

 
class Home extends Component {
  render() {
    return (
     

      <div className="container-fluid">
        <div className="card-group gap-0">
    
        <Card bg="dark" className="" style={{color:"orangered", borderRadius:"2rem", boxShadow:"0.5rem 1rem 1rem rgba(0, 0, 0, 0.5)",  }} >        
        <Card.Title as="h1" className="text" style={{color:"orangered", margin:"20px" ,   }} >Discover the North Coast 500</Card.Title>
        <Card.Subtitle as="h4" className="text" style={{color:"orangered", marginLeft:"30px", textAlign:"match-parent", borderRadius:"50%", textJustify:"inter-word"  }} >Scotland’s ultimate road trip</Card.Subtitle> 
        <Card.Body className="text" style={{color:"orangered", marginBottom:"10rem" , padding:"2rem", textAlign:"justify", borderRadius:"50%", textJustify:"inter-word"  }} >
          <Card.Text className="text" style={{margin:"5px" , textAlign:"justify", textJustify:"inter-word",}} >
            
            Bringing together a route of just over 500 miles (516 to be exact…) of stunning coastal scenery, white sandy beaches, rugged mountains, remote fishing villages, hidden gems, and a wealth of unforgettable experiences; the North Coast 500 is one of the world’s most beautiful road trips.

Whether you’re looking for an action-packed break, a chance to relax or simply want to see more of the North Highlands’ breath-taking scenery, you will find it on the NC500. Start planning your next adventure today.
            
          </Card.Text>
          {/* <ButtonGroup aria-label="Basic example">
            <Button variant="primary">Button</Button>
            <Button variant="secondary">Button</Button>
          </ButtonGroup> */}
        </Card.Body>
        
      </Card>
      <Card className="text-warning" style={{backgroundColor:"inherit",margin:"3rem", borderWidth:"0", borderRadius:"20%",  }} >
      <Card.Img className="img-responsive" variant="top" style={{width:"80%"  }} src="https://www.northcoast500.com/wp-content/themes/nc500/images/nc500-map.png" />
      </Card>
          </div>
          </div>

    );
    
  }
}
 
export default Home;