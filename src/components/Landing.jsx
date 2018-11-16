import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import React, { Component } from "react";

import {
    withScriptjs,
    GoogleMap,
    Marker,
    withGoogleMap,
    InfoWindow,
    Text,
    FaAnchor,
  } from "react-google-maps";  
import {} from "reactstrap";
import {database} from '../firebase'

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const Map = compose(
    withProps({
      googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdQLHKZ070yXyixJJGT8WG6FVY9Rlyc8Q&?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100vh` }} />,
      containerElement: <div style={{ height: `100vh` }} />,
      mapElement: <div style={{ height: `90vh`}} />
    }),
    withHandlers({
      onMarkerClusterClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        console.log('Current clicked markers length: ', clickedMarkers.length)
        console.log("clickedMarkers", clickedMarkers)
        
      }
    }),
    withStateHandlers(() => (
      {
        isOpen: false,
      }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
    withScriptjs,
    withGoogleMap
  )(props => {
    console.log("props.state.latLngs", props.state.latLngs);
    return (
      <GoogleMap
        className="map"
        defaultCenter={{ lat: 51.5074, lng: 0.1278 }}
        center=  {{ lat: 51.5074, lng: 0.1278 }} //{{ lat: props.state.location.lat, lng: props.state.location.lng }}
        zoom={props.state.zoom}
      >
        {
          <MarkerClusterer
            onClick={props.onMarkerClusterClick}
            averageCenter
            enableRetinaIcons
            gridSize={50}
            // position={{
            //   lat: props.state.location.lat,
            //   lng: props.state.location.lng
            // }}
          >
            {
              props.state.latLngsArray.map(latLng => (
                <Marker 
                  key={latLng[2]}
                  position={{ lat: Number(latLng[0]), lng: Number(latLng[1]) }}
                  onClick={props.onToggleOpen}
                >
                  {/* <InfoWindow>
                    <FaAnchor />
                  </InfoWindow> */}
                </Marker>
              ))
            }
          </MarkerClusterer>
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
      sentMessage: false,
      latLngsArray:[],
      latLngsObj:{}
    };

    componentDidUpdate() {
      // database.getLatLngsSnapshot(latLngsObj => {

      //   let latLngsArray = [];

      //   for (var LatLngKey in latLngsObj) {
      //     latLngsArray.push(latLngsObj[LatLngKey])
      //   }

      //   latLngsArray = latLngsArray.slice(10, 20)

      //   console.log("latLngsArray", latLngsArray)

      //   this.setState({
      //     latLngsObj,
      //     latLngsArray,
      //   })

      // });
    }
  
    componentDidMount() {

      database.getLatLngsSnapshot(latLngsObj => {

        let latLngsArray = [];

        for (var LatLngKey in latLngsObj) {
          latLngsArray.push(latLngsObj[LatLngKey])
        }

        latLngsArray = latLngsArray.slice(10, 20)

        console.log("latLngsArray", latLngsArray)

        this.setState({
          latLngsObj,
          latLngsArray,
        })

      });

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
        <Map state={this.state} />
        )    
    }
}

export default LandingPage