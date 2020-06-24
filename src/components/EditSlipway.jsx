import { compose, withProps, withState, withHandlers } from "recompose";
import React, { Component } from "react";
import EditSlipwayForm from "./EditSlipwayForm";

import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap
} from "react-google-maps";
import {} from "reactstrap";

const MapAndForm = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100vh" }} />,
    containerElement: <div style={{ height: "60vh" }} />,
    mapElement: <div style={{ height: "60vh" }} />
  }),
  withState('editedLatLng', 'updateLatLng', []),
  withHandlers({
    onClick: ({updateLatLng}) => (e) => {
      updateLatLng(editedLatLng => {
        return [ e.latLng.lat(), e.latLng.lng()]
      })
    },
    resetPin:({updateLatLng}) => () => {
      updateLatLng(editedLatLng => {
        return []
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <div>
      {props.state.location && (
        <GoogleMap
          onClick={props.onClick}
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
              lat: Number(props.editedLatLng[0]) || Number(props.state.location.lat),
              lng: Number(props.editedLatLng[1]) || Number(props.state.location.lng)
            }}
          />
        </GoogleMap>
      )}
      <EditSlipwayForm state={props.state} editedLatLng ={props.editedLatLng} resetPin={props.resetPin} />
    </div>
  );
});

class EditSlipway extends Component {
  state = {
    zoom: 3,
    id: this.props.id,
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
        <MapAndForm
          className="new-slipway-map"
          state={this.state}

        />
      </div>
    );
  }
}

export default EditSlipway;
