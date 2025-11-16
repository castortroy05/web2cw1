import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRoute } from "react-icons/fa";

function Itineraries() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4 text-center">
        <Card.Body className="p-5">
          <FaRoute className="text-warning mb-3" size={64} />
          <Card.Title as="h2" className="mb-3">Itinerary Planner</Card.Title>
          <Card.Text className="text-muted mb-4">
            Plan your perfect NC500 journey by creating custom itineraries with multiple hostel stops.
            This feature is coming soon!
          </Card.Text>
          <Button
            variant="warning"
            size="lg"
            onClick={() => navigate('/hostels')}
          >
            Browse Hostels Instead
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Itineraries;
