/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Navbar, Button} from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap';
import {
    Route,
    Routes,
    NavLink,
    BrowserRouter
  } from "react-router-dom";
import Home from "./Home";
import Hostels from "./components/Hostels";
import Itineraries from './components/Itineraries'
import Contact from './components/Contact'
import About from "./components/About";
import apiClient from "./http-common";


  class Main extends Component {
    render() {
      return (
          
        <BrowserRouter>
          <div>
            <h1>NC 500 </h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/hostels">Hostels</NavLink></li>
              <li><NavLink to="/itineraries">Itineraries</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li> 
              <li><NavLink to="/about">About</NavLink></li>               
            </ul>
            <div className="content">
            <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/hostels" element={<Hostels />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/itineraries" element={<Itineraries />}/>
            </Routes>
            </div>
          </div>
        </BrowserRouter>
      );
    }
  }
 
export default Main;