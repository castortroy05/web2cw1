import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Route, Routes, NavLink, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./components/Home";
import Hostels from "./components/Hostels";
import Itineraries from './components/Itineraries';
import Hostel from './components/Hostel';
import NewItinerary from './components/NewItinerary';

function Main() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={NavLink} to="/">
              NC500 Explorer
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/hostels">Hostels</Nav.Link>
                <Nav.Link as={NavLink} to="/itineraries">Itineraries</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hostels" element={<Hostels />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/newitinerary" element={<NewItinerary />} />
            <Route path="/hostels/:id" element={<Hostel />} />
          </Routes>
        </Container>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  );
}

export default Main;
