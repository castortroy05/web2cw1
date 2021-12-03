import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react'
 
class About extends Component {
  render()
  

  
  {
    const style = {
        width: '33%',
        height: '33%',
        }
      
    return (
      <div className="content">
        <h2>About</h2>
        <p>We are the NC500 appreciation society</p>
        <div className="content"><Map 
 google={this.props.google} 
 zoom={10}
 size={style}
 resetBoundsOnResize = {true}
 initialCenter={{
 lat: 35.5496939,
 lng: -120.7060049
 }}
 style={style}
 /></div>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDhcNsNAkCToiEoqD6OHKDGplxz-Yk3e-A&')
   })(About);