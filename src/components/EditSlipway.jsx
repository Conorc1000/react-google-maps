import { compose, withProps } from "recompose";
import React, { Component } from "react";
import EditSlipwayForm from "./EditSlipwayForm";

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
    <div>
      {props.state.location && (
        <GoogleMap
          // onClick={props.setLatLngFromMapClick}
          className="map"
          defaultCenter={{
            lat: Number(props.state.location.lat),
            lng: Number(props.state.location.lng)
          }}
          zoom={props.state.zoom}
        >
          <Marker
            key="1"
            position={{
              lat: Number(props.state.location.lat),
              lng: Number(props.state.location.lat)
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
});

class EditSlipway extends Component {
  state = {
    zoom: 3,
    id: this.props.id
  };

  setLatLngFromMapClick = event => {
    this.setState({
      newLatitude: event.latLng.lat(),
      newLongitude: event.latLng.lng()
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.latLngArray !== this.state.latLngArray ||
      nextProps.slipwayDetails !== this.state.slipwayDetails
    ) {
      this.setState({
        latLngArray: nextProps.latLngArray,
        slipwayDetails: nextProps.slipwayDetails,
        zoom: 12,
        location: {
          lat: nextProps.latLngArray[0],
          lng: nextProps.latLngArray[1]
        }
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
        <EditSlipwayForm state={this.state} />
      </div>
    );
  }
}

export default EditSlipway;
