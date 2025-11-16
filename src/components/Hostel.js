import React, { useState, useEffect } from "react";
import {
  Card, Badge, Button, Modal, Form, Container, Row, Col,
  Spinner, ButtonGroup
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaStar, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowLeft } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { API_URL, GOOGLE_API_KEY } from "../config/api";
import apiClient from "../http-common";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Hostel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    reviewer: '',
    review: ''
  });

  const [rating, setRating] = useState(5);

  useEffect(() => {
    loadHostel();
  }, [id]);

  const loadHostel = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_URL}/hostels/${id}`);
      setHostel(response.data);
    } catch (error) {
      console.error('Error loading hostel:', error);
      toast.error('Failed to load hostel details');
      navigate('/hostels');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewForm.reviewer.trim() || !reviewForm.review.trim()) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (reviewForm.review.length < 5) {
      toast.warning('Review must be at least 5 characters long');
      return;
    }

    try {
      setSubmitting(true);
      await apiClient.post(`${API_URL}/hostels/${id}/review`, reviewForm);
      toast.success('Review submitted successfully!');
      setShowReviewModal(false);
      setReviewForm({ reviewer: '', review: '' });
      loadHostel();
    } catch (error) {
      console.error('Error submitting review:', error);
      const errorMsg = error.response?.data?.errors?.[0]?.msg || 'Failed to submit review';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await apiClient.post(`${API_URL}/hostels/${id}/rating`, { rating });
      toast.success('Rating submitted successfully!');
      setShowRatingModal(false);
      setRating(5);
      loadHostel();
    } catch (error) {
      console.error('Error submitting rating:', error);
      const errorMsg = error.response?.data?.errors?.[0]?.msg || 'Failed to submit rating';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(2);
  };

  const getRatingsDistribution = (ratings) => {
    const distribution = [0, 0, 0, 0, 0];
    if (ratings) {
      ratings.forEach(r => {
        if (r >= 1 && r <= 5) {
          distribution[r - 1]++;
        }
      });
    }
    return distribution;
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="warning" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading hostel details...</p>
      </Container>
    );
  }

  if (!hostel) {
    return (
      <Container className="text-center py-5">
        <h3 className="text-muted">Hostel not found</h3>
        <Button variant="warning" onClick={() => navigate('/hostels')}>
          Back to Hostels
        </Button>
      </Container>
    );
  }

  const avgRating = calculateAverageRating(hostel.ratings);
  const distribution = getRatingsDistribution(hostel.ratings);

  const chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      label: `Ratings - ${hostel.ratings?.length || 0} total - ${avgRating} average`,
      data: distribution,
      backgroundColor: 'rgba(255, 193, 7, 0.6)',
      borderColor: 'rgba(255, 193, 7, 1)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <Container fluid>
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => navigate('/hostels')}
      >
        <FaArrowLeft className="me-2" />
        Back to Hostels
      </Button>

      <Row>
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Header className="bg-dark text-white border-0 rounded-top-4">
              <h3 className="mb-0">{hostel.name}</h3>
              {hostel.ratings && hostel.ratings.length > 0 && (
                <div className="d-flex align-items-center mt-2">
                  <FaStar className="text-warning me-1" />
                  <span className="fw-bold">{avgRating}</span>
                  <span className="text-white-50 ms-1">({hostel.ratings.length} ratings)</span>
                </div>
              )}
            </Card.Header>

            <Card.Body className="p-4">
              <div className="mb-3">
                <h5 className="mb-3">Location</h5>
                <p className="mb-1"><FaMapMarkerAlt className="text-warning me-2" />{hostel.address}</p>
                <p className="mb-1"><FaEnvelope className="text-warning me-2" />
                  <a href={`mailto:${hostel.email}`}>{hostel.email}</a>
                </p>
                {hostel.phone && (
                  <p className="mb-3"><FaPhone className="text-warning me-2" />{hostel.phone}</p>
                )}
              </div>

              {hostel.location && (
                <div className="mb-4">
                  <iframe
                    title="Hostel Location"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${hostel.location.lat},${hostel.location.long}`}
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '0.5rem' }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              )}

              <div>
                <h5 className="mb-3">About</h5>
                <p className="text-justify">{hostel.description}</p>
              </div>
            </Card.Body>

            <Card.Footer className="bg-white border-0 pb-3">
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                <Button variant="warning" href={`mailto:${hostel.email}`}>
                  <FaEnvelope className="me-2" />
                  Email
                </Button>
                <Button
                  variant="warning"
                  href={`https://www.google.com/maps/search/?api=1&query=${hostel.location?.lat},${hostel.location?.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaMapMarkerAlt className="me-2" />
                  Get Directions
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Reviews</h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {hostel.reviews && hostel.reviews.length > 0 ? (
                hostel.reviews.map((review, index) => (
                  <Card key={index} className="mb-3 bg-light border-0">
                    <Card.Body>
                      <Card.Text>{review.review}</Card.Text>
                      <Badge bg="secondary">{review.reviewer}</Badge>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-muted text-center">No reviews yet. Be the first to review!</p>
              )}
            </Card.Body>
            <Card.Footer className="bg-white border-top">
              <Button
                variant="warning"
                className="w-100"
                onClick={() => setShowReviewModal(true)}
              >
                Write a Review
              </Button>
            </Card.Footer>
          </Card>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Ratings</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '250px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-top">
              <Button
                variant="warning"
                className="w-100"
                onClick={() => setShowRatingModal(true)}
              >
                <FaStar className="me-2" />
                Add Rating
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleReviewSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={reviewForm.reviewer}
                onChange={(e) => setReviewForm({ ...reviewForm, reviewer: e.target.value })}
                maxLength={50}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Share your experience..."
                value={reviewForm.review}
                onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                maxLength={500}
                required
              />
              <Form.Text className="text-muted">
                {reviewForm.review.length}/500 characters
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReviewModal(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="warning" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Rating Modal */}
      <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Rating</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRatingSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Rating (1-5 stars)</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Range
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <div className="d-flex align-items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < rating ? 'text-warning' : 'text-muted'}
                      size={24}
                    />
                  ))}
                </div>
              </div>
              <Form.Text className="text-muted">
                Selected: {rating} {rating === 1 ? 'star' : 'stars'}
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRatingModal(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="warning" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Hostel;
