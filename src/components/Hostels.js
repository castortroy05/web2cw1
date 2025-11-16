import React, { useState, useEffect } from "react";
import { Card, Badge, Button, Form, Container, Row, Col, Spinner, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaStar, FaEnvelope, FaSearch } from "react-icons/fa";
import { API_URL } from "../config/api";
import apiClient from "../http-common";

function Hostels() {
  const [allHostels, setAllHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_URL}/hostels`);
      setAllHostels(response.data);
      setFilteredHostels(response.data);
    } catch (error) {
      console.error('Error loading hostels:', error);
      toast.error('Failed to load hostels. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredHostels(allHostels);
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = allHostels.filter(hostel =>
      hostel.name.toLowerCase().includes(searchLower) ||
      hostel.address.toLowerCase().includes(searchLower) ||
      hostel.description.toLowerCase().includes(searchLower)
    );

    setFilteredHostels(filtered);
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const HostelCard = ({ hostel }) => {
    const avgRating = calculateAverageRating(hostel.ratings);

    return (
      <Col md={6} lg={4} xl={3} className="mb-4">
        <Card className="h-100 border-0 shadow-sm rounded-4 hover-lift">
          <Card.Header className="bg-dark text-white text-center border-0 rounded-top-4">
            <Card.Title className="mb-0 h6">{hostel.name}</Card.Title>
            {hostel.ratings && hostel.ratings.length > 0 && (
              <div className="d-flex justify-content-center align-items-center mt-2">
                <FaStar className="text-warning me-1" />
                <span className="fw-bold">{avgRating}</span>
                <span className="text-white-50 ms-1">({hostel.ratings.length})</span>
              </div>
            )}
          </Card.Header>

          <Card.Body className="d-flex flex-column">
            <Card.Text className="fw-bold text-center mb-2">
              {hostel.address}
            </Card.Text>
            <Card.Text className="text-muted small mb-3">
              <FaEnvelope className="me-1" />
              <a href={`mailto:${hostel.email}`} className="text-decoration-none">
                {hostel.email}
              </a>
            </Card.Text>
            <Card.Text className="flex-grow-1 small" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {hostel.description}
            </Card.Text>

            {hostel.reviews && hostel.reviews.length > 0 && (
              <div className="mt-3">
                <small className="text-muted fw-bold">Recent Reviews:</small>
                {hostel.reviews.slice(0, 2).map((review, index) => (
                  <Card key={index} className="mb-2 bg-light border-0">
                    <Card.Body className="p-2">
                      <Card.Text className="small mb-1">{review.review}</Card.Text>
                      <Badge bg="secondary" className="small">
                        {review.reviewer}
                      </Badge>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Card.Body>

          <Card.Footer className="bg-white border-0 text-center pb-3">
            <Link to={`/hostels/${hostel.id}`} className="text-decoration-none">
              <Button variant="warning" size="sm" className="w-100">
                View Details
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="warning" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading hostels...</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={6} className="mx-auto">
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body>
              <h4 className="text-center mb-3">Search for a Hostel</h4>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, location, or description..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border-start-0 ps-0"
                />
              </InputGroup>
              {searchTerm && (
                <small className="text-muted d-block mt-2">
                  Found {filteredHostels.length} {filteredHostels.length === 1 ? 'hostel' : 'hostels'}
                </small>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {filteredHostels.length === 0 ? (
        <Row>
          <Col className="text-center py-5">
            <h3 className="text-muted">No hostels found</h3>
            <p className="text-muted">Try adjusting your search criteria</p>
          </Col>
        </Row>
      ) : (
        <Row>
          {filteredHostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Hostels;
