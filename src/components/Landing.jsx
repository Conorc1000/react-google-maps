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
import {database} from '../firebase'

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const Map = compose(
    withProps({
      googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdQLHKZ070yXyixJJGT8WG6FVY9Rlyc8Q&?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: '100vh' }} />,
      containerElement: <div style={{ height: '90vh' }} />,
      mapElement: <div  style={{ height: '90vh' }} />
    }),
    withHandlers({
      onMarkerClusterClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();  
      },

    }),
    withStateHandlers(() => (
      {
        isOpen: false,
        infoIndex: null
      }), {
        showInfo: ({ isOpen, infoIndex }) => (index) => ({

          isOpen: infoIndex !== index || !isOpen,
          infoIndex: index
        })
      }
    ),
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
        {
          <MarkerClusterer
            onClick={props.onMarkerClusterClick}
            averageCenter
            enableRetinaIcons
            gridSize={50}
        
          >
            {
              props.state.latLngsArray.map(latLng => (
                <Marker 
                  key={latLng[2]}
                  position={{ lat: Number(latLng[0]), lng: Number(latLng[1]) }}
                  onClick={ () => props.showInfo(latLng[2]) }
                >
                  {
                    props.isOpen && props.infoIndex === latLng[2] &&
                    <InfoWindow onCloseClick={props.showInfo}>
                      <div>
                        {
                          props.state.slipwayDetails[latLng[2]] && 
                          <h5>{props.state.slipwayDetails[latLng[2]].Name}</h5>
                        }
                        <p>Lat: {latLng[0]}</p>
                        <p>Long: {latLng[1]}</p>
                        
                        {
                          props.state.slipwayDetails[latLng[2]] &&
                          props.state.slipwayDetails[latLng[2]].imgs &&
                          <p>{props.state.slipwayDetails[latLng[2]].imgs.length} Photos</p>
                        }

                        <a href={`/edit-slipway/` + latLng[2]}>More Information</a>

                      </div>
                    </InfoWindow>
                  }
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
      newSlipway: true,
      sendingMessage: false,
      sentMessage: false,
      latLngsArray:[],
      latLngsObj:{}
    };
  
    componentDidMount() {

      database.getLatLngsSnapshot(latLngsObj => {

        let latLngsArray = [];

        for (var LatLngKey in latLngsObj) {
          latLngsArray.push(latLngsObj[LatLngKey])
        }

        this.setState({
          latLngsObj,
          latLngsArray,
        })
      });

      database.getSlipwayDetailsSnapshot(slipwayDetails => {
        this.setState({
          slipwayDetails
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