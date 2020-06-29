import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import React, { Component } from "react";

import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow
} from "react-google-maps";
import {} from "reactstrap";
import { database } from "../firebase";

const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100vh" }} />,
    containerElement: <div style={{ height: "90vh" }} />,
    mapElement: <div style={{ height: "calc(100vh - 56px)" }} />
  }),
  withHandlers({
    onMarkerClusterClick: () => markerClusterer => {
      markerClusterer.getMarkers();
    }
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
      infoIndex: null
    }),
    {
      showInfo: ({ isOpen, infoIndex }) => index => ({
        isOpen: infoIndex !== index || !isOpen,
        infoIndex: index
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <div>
      <div>

      </div>

      <GoogleMap
        className="map"
        defaultCenter={{ lat: 51.5074, lng: 0.1278 }}
        zoom={props.state.zoom}
      >
        {
          <MarkerClusterer
            onClick={props.onMarkerClusterClick}
            averageCenter
            enableRetinaIcons
            gridSize={28}
          >
            {props.state.latLngsArray.map(latLng => (
              <Marker
                key={latLng[2]}
                position={{ lat: Number(latLng[0]), lng: Number(latLng[1]) }}
                onClick={() => props.showInfo(latLng[2])}
              >
                {props.isOpen && props.infoIndex === latLng[2] && (
                  <InfoWindow onCloseClick={props.showInfo}>
                    <div>
                      {props.state.slipwayDetails[latLng[2]] && (
                        <h5>{props.state.slipwayDetails[latLng[2]].Name}</h5>
                      )}

                      {props.state.slipwayDetails[latLng[2]] &&
                        props.state.slipwayDetails[latLng[2]].imgs && (
                          <p>
                            {props.state.slipwayDetails[latLng[2]].imgs.length} Photos
                          </p>
                        )}

                      <a href={`/view-slipway/` + latLng[2]}>More Information</a>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </MarkerClusterer>
        }
      </GoogleMap>
    </div>
  );
});

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        lat: 51.5074,
        lng: 0.1278
      },
      haveUsersLocation: false,
      zoom: 3,
      newSlipway: true,
      sendingMessage: false,
      sentMessage: false,
      latLngsArray: this.props.latLngsArray,
      latLngsObj: this.props.latLngsObj,
      slipwayDetails: this.props.slipwayDetails
    };
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
    return <Map state={this.state} />;
  }
}

export default LandingPage;
