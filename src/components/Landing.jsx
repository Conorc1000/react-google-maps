
import { compose, withProps } from "recompose";
import React, { Component } from "react";

import {
    withScriptjs,
    GoogleMap,
    Marker,
    withGoogleMap
  } from "react-google-maps";
  
import {} from "reactstrap";
  
const Map = compose(
    withProps({
        googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdQLHKZ070yXyixJJGT8WG6FVY9Rlyc8Q&?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100vh` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `90vh`}} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => {
    console.log("props", props.state.location);
    return (
      <GoogleMap
        className="map"
        defaultCenter={{ lat: 51.5074, lng: 0.1278 }}
        center={{ lat: props.state.location.lat, lng: props.state.location.lng }}
        zoom={props.state.zoom}
      >
        {
          <Marker
            position={{
              lat: props.state.location.lat,
              lng: props.state.location.lng
            }}
          />
        }
      </GoogleMap>
    );
  });
  
class LandingPage extends Component {
    state = {
      location: {
        lat: 51.5074,
        lng: 0.1278
      },
      haveUsersLocation: false,
      zoom: 3,
      newSlipway: {
        name: "",
        suitability: ""
      },
      sendingMessage: false,
      sentMessage: false
    };
  
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            haveUsersLocation: true,
            zoom: 13
          });
        },
        () => {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(location => {
              this.setState({
                location: {
                  lat: location.latitude,
                  lng: location.longitude
                },
                zoom: 5
              });
            });
        }
      );
    }
  
    render() {
        return (
        <Map state={this.state} />
        )    
    }
}

export default LandingPage