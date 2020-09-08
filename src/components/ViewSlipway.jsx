import { compose, withProps } from "recompose";
import React, { Component } from "react";
import ViewSlipwayForm from "./ViewSlipwayForm";
import SquareResponsiveAd from "./ads/SquareResponsiveAd";

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
      "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&?v=3.exp&libraries=geometry,drawing,places",
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
              lng: Number(props.state.location.lng)
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
});

class ViewSlipway extends Component {
  state = {
    id: this.props.id
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.latLngArray !== this.state.latLngArray ||
      nextProps.slipwayDetails !== this.state.slipwayDetails
    ) {
      this.setState({
        latLngArray: nextProps.latLngArray,
        slipwayDetails: nextProps.slipwayDetails,
        zoom: 14,
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
        <Map className="new-slipway-map" state={this.state} />
        
        <ViewSlipwayForm state={this.state} />
      </div>
    );
  }
}

export default ViewSlipway;
