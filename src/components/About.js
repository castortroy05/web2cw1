import React from "react";
import { Container, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-5">
          <Card.Title as="h2" className="mb-4">About NC500 Explorer</Card.Title>
          <Card.Text>
            Welcome to NC500 Explorer, your guide to discovering the best hostels
            along Scotland's North Coast 500 route.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;
