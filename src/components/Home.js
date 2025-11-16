import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRoute, FaHotel, FaMapMarkedAlt } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center mb-5">
        <Col lg={10} xl={8}>
          <Card
            bg="dark"
            text="white"
            className="shadow-lg border-0 rounded-4 overflow-hidden"
          >
            <Card.Body className="p-4 p-md-5">
              <Card.Title as="h1" className="display-4 fw-bold text-warning mb-4">
                Discover the North Coast 500
              </Card.Title>
              <Card.Subtitle as="h4" className="text-white-50 mb-4">
                Scotland's ultimate road trip
              </Card.Subtitle>
              <Card.Text className="lead mb-4">
                Bringing together a route of just over 500 miles (516 to be exact…) of stunning coastal
                scenery, white sandy beaches, rugged mountains, remote fishing villages, hidden gems, and a
                wealth of unforgettable experiences; the North Coast 500 is one of the world's most beautiful
                road trips.
              </Card.Text>
              <Card.Text className="mb-4">
                Whether you're looking for an action-packed break, a chance to relax or simply want to see
                more of the North Highlands' breath-taking scenery, you will find it on the NC500. Start
                planning your next adventure today.
              </Card.Text>
              <div className="d-flex gap-3 flex-wrap">
                <Button
                  variant="warning"
                  size="lg"
                  className="px-4"
                  onClick={() => navigate('/hostels')}
                >
                  <FaHotel className="me-2" />
                  Browse Hostels
                </Button>
                <Button
                  variant="outline-warning"
                  size="lg"
                  className="px-4"
                  onClick={() => navigate('/itineraries')}
                >
                  <FaRoute className="me-2" />
                  Plan Itinerary
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Img
              variant="top"
              src="https://www.northcoast500.com/wp-content/themes/nc500/images/nc500-map.png"
              alt="NC500 Route Map"
              className="img-fluid"
            />
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm rounded-4 hover-lift">
            <Card.Body className="text-center p-4">
              <FaHotel className="text-warning mb-3" size={48} />
              <Card.Title className="h4 mb-3">15 Quality Hostels</Card.Title>
              <Card.Text className="text-muted">
                Browse through our selection of carefully curated hostels along the NC500 route.
                Each offering unique experiences and stunning locations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm rounded-4 hover-lift">
            <Card.Body className="text-center p-4">
              <FaRoute className="text-warning mb-3" size={48} />
              <Card.Title className="h4 mb-3">Plan Your Journey</Card.Title>
              <Card.Text className="text-muted">
                Create custom itineraries with multiple stops. Plan how many nights you'll spend
                at each location to make the most of your adventure.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm rounded-4 hover-lift">
            <Card.Body className="text-center p-4">
              <FaMapMarkedAlt className="text-warning mb-3" size={48} />
              <Card.Title className="h4 mb-3">Interactive Maps</Card.Title>
              <Card.Text className="text-muted">
                View each hostel's location on an interactive map. Get directions and explore
                the surrounding areas to plan your perfect trip.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
