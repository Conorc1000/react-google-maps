import { compose, withProps} from "recompose";
import React, { Component } from "react";
import NewSlipwayForm from './NewSlipwayForm';

import {
    withScriptjs,
    GoogleMap,
    Marker,
    withGoogleMap,
  } from "react-google-maps";  
import {} from "reactstrap";

const Map = compose(
    withProps({
      googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdQLHKZ070yXyixJJGT8WG6FVY9Rlyc8Q&?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: '100vh' }} />,
      containerElement: <div style={{ height: '50vh' }} />,
      mapElement: <div  style={{ height: '50vh' }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => {
    return (
      <GoogleMap
        onClick={props.setLatLngFromMapClick}
        className="map"
        defaultCenter={{ lat: 51.5074, lng: 0.1278 }}
        center= {{ lat: props.state.location.lat, lng: props.state.location.lng }}
        zoom={props.state.zoom}
      >     
        <Marker 
          key='1'
          position={{ lat: props.state.newLatitude, lng: props.state.newLongitude }}
        />
      </GoogleMap>
    );
  });
  
class NewSlipway extends Component {
    state = {
      location: {
        lat: 51.5074,
        lng: 0.1278
      },
      haveUsersLocation: false,
      zoom: 3,
      sendingMessage: false,
      sentMessage: false,
      newLatitude: 0,
      newLongitude: 0

    };
  
    setLatLngFromMapClick = (event) => {
      this.setState({
        newLatitude: Number(event.latLng.lat()),
        newLongitude: Number(event.latLng.lng())
      })
    }

    componentDidMount() {
    
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            haveUsersLocation: true,
            zoom: 6 
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
        <div>
          <Map className="new-slipway-map" state={this.state} setLatLngFromMapClick={this.setLatLngFromMapClick} />
          <NewSlipwayForm state={this.state} />
        </div>
        
        )    
    }
}

export default NewSlipway