import { compose, withProps } from "recompose";
import React, { Component } from "react";
import ViewSlipwayForm from "./ViewSlipwayForm";

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
    loadingElement: <div style={{ height: "100vh" }} />,
    containerElement: <div style={{ height: "50vh" }} />,
    mapElement: <div style={{ height: "50vh" }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      className="map"
      defaultCenter={{ lat: 51.5074, lng: 0.1278 }}
      //center=  {{ lat: 51.5074, lng: 0.1278 }} //{{ lat: props.state.location.lat, lng: props.state.location.lng }}
      zoom={props.state.zoom}
    >
      <Marker
        key="1"
        position={{
          lat: props.state.newLatitude,
          lng: props.state.newLongitude
        }}
      />
    </GoogleMap>
  );
});

class ViewSlipway extends Component {
  state = {
    location: {
      lat: 51.5074,
      lng: 0.1278
    },
    zoom: 3,
  };

  componentDidMount() {

    // const slipwayId = this.props. 

    // const slipwayLat = this.props. 

    this.setState({
      location: {
        lat: 51.5074,
        lng: 0.1278
      },
      zoom: 8
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.latLngsArray !== this.state.latLngsArray
      || nextProps.latLngsObj !== this.state.latLngsObj
      || nextProps.slipwayDetails !== this.state.slipwayDetails) {
      this.setState({ 
        latLngsArray: nextProps.latLngsArray,
        latLngsObj: nextProps.latLngsObj,
        slipwayDetails: nextProps.slipwayDetails
       });
    }
  }

  render() {
    return (
      <div>
        <Map
          className="new-slipway-map"
          state={this.state}
        />
        <ViewSlipwayForm state={this.state} />
      </div>
    );
  }
}

export default ViewSlipway;
