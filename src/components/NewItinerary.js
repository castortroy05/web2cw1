import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function NewItinerary() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => navigate('/itineraries')}
      >
        <FaArrowLeft className="me-2" />
        Back to Itineraries
      </Button>

      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-5 text-center">
          <Card.Title as="h2" className="mb-3">Create New Itinerary</Card.Title>
          <Card.Text className="text-muted">
            This feature is under development. Check back soon!
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NewItinerary;
