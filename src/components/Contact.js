import React from "react";
import { Container, Card } from "react-bootstrap";

function Contact() {
  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-5">
          <Card.Title as="h2" className="mb-4">Contact Us</Card.Title>
          <Card.Text>
            Get in touch with us for any questions about the NC500 route or hostels.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Contact;
