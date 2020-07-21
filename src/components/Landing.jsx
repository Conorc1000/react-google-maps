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


const getMapStateFromLocalStorage = () => {
  const storage = localStorage.getItem('mapState');

  if (storage && Object.keys(JSON.parse(storage)).length !== 0) {

    const parsedStorage = JSON.parse(storage)
    if( typeof parsedStorage.lat == 'string' ) {
      return {
        zoom: 13, //parsedStorage.zoom, allways seems to be 5
        lat: Number(parsedStorage.lat),
        lng: Number(parsedStorage.lng)
      }
    } else {
      return JSON.parse(storage);
    }
  }

  return {
    zoom: 5,
    lat: 51.5074,
    lng: 0.1278
  }
}

const storeMapStateInLocalStorage = location => {
  localStorage.setItem('mapState', JSON.stringify(location));
}

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "calc(100vh - 150px)" }} />,
    containerElement: <div style={{ height: "calc(100vh - 150px)" }} />,
    mapElement: <div style={{ height: "calc(100vh - 150px)" }} />,
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
        defaultCenter={{ lat: Number(props.state.location.lat), lng: Number(props.state.location.lng) }}
        zoom={props.state.location.zoom}
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

                      {props.saveMapState(props.state.location.zoom, latLng[0], latLng[1])}
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
      location: getMapStateFromLocalStorage(),
      haveUsersLocation: false,
      newSlipway: true,
      sendingMessage: false,
      sentMessage: false,
      latLngsArray: this.props.latLngsArray,
      latLngsObj: this.props.latLngsObj,
      slipwayDetails: this.props.slipwayDetails
    };

    this.saveMapState = this.saveMapState.bind(this);
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

  saveMapState(zoom, lat, lng) {
    storeMapStateInLocalStorage({
      zoom: zoom,
      lat: lat,
      lng: lng
    })
  }

  render() {
    return <Map state={this.state} saveMapState={this.saveMapState} />;
  }
}

export default LandingPage;
