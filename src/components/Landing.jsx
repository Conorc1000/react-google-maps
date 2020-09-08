import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SmallPin from "./icons8-map-pin-20.png";
import MediumPin from "./icons8-map-pin-35.png";
import LargePin from "./icons8-map-pin-48.png";
import BannerResponsiveAd from "./ads/BannerResponsiveAd";


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
    }
  }

  return {
    zoom: 5,
    lat: 51.5074,
    lng: 0.1278
  }
}

const getFiltersFromLocalStorage = () => {

  const storage = localStorage.getItem('filterState');

  if (storage && Object.keys(JSON.parse(storage)).length !== 0) {

    const parsedStorage = JSON.parse(storage)
    return {
      filterLarge: parsedStorage.filterLarge || false,
      filterSmall: parsedStorage.filterSmall || false,
      filterPortable: parsedStorage.filterPortable || false,
      filterUnknown: parsedStorage.filterUnknown || false
    }
  }

  return {
    filterLarge: false,
    filterSmall: false,
    filterPortable: false,
    filterUnknown: false
  }
}

const storeMapStateInLocalStorage = location => {
  localStorage.setItem('mapState', JSON.stringify(location));
}

const storeFilterStateInLocalStorage = filter => {
  localStorage.setItem('filterState', JSON.stringify(filter));
}

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "calc(100vh - 200px)" }} />,
    containerElement: <div style={{ height: "calc(100vh - 200px)" }} />,
    mapElement: <div style={{ height: "calc(100vh - 200px)" }} />,
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

  function handleZoomChange() {
    props.onZoomChange(this.getZoom());
  }

  function createMapOptions(maps) {
    return {
      gestureHandling:'greedy'
    }
  }

  function showMarker(suitability) {
    switch (suitability) {
      case 'Large trailer needs a car':
        if (props.state.filter.filterLarge){
          return false;
        } else {
          return true;
        }
        break;
      case 'Small trailer can be pushed':
        if (props.state.filter.filterSmall){
          return false;
        } else {
          return true;
        }
        break;
      case 'Portable Only':
        if (props.state.filter.filterPortable){
          return false;
        } else {
          return true;
        }
        break;
      case 'Unknown':
        if (props.state.filter.filterUnknown){
          return false;
        } else {
          return true;
        }
        break;
      default:
        return true;
    }
  }

  function icon(zoom) {
    if (zoom < 8) {
      return SmallPin;
    } else if (zoom >= 8 && zoom < 12) {
      return MediumPin;
    } else {
      return LargePin;
    }
  }

  return (
    <div>

      <GoogleMap
        className="map"
        defaultCenter={{ lat: Number(props.state.location.lat), lng: Number(props.state.location.lng) }}
        zoom={props.state.location.zoom}
        onZoomChanged={handleZoomChange}
        options={createMapOptions}
      >
          <div>

            {props.state.latLngsArray.map(latLng => (
              <div>
              {
                props.state.filteredSlipwayDetails &&
                props.state.filteredSlipwayDetails[latLng[2]] &&
                (showMarker(props.state.slipwayDetails[latLng[2]].Suitability)) &&

                (<Marker
                  key={latLng[2]}
                  position={{ lat: Number(latLng[0]), lng: Number(latLng[1]) }}
                  onClick={() => props.showInfo(latLng[2])}
                  icon={icon(props.state.location.zoom)}
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
                </Marker>)
              }
              </div>
            ))

          }
        </div>
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
      slipwayDetails: this.props.slipwayDetails,
      filteredSlipwayDetails: this.props.slipwayDetails,
      filter: getFiltersFromLocalStorage(),
    };
    this.saveMapState = this.saveMapState.bind(this);
    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.toggleLargeFilter = this.toggleLargeFilter.bind(this);
    this.toggleSmallFilter = this.toggleSmallFilter.bind(this);
    this.togglePortableFilter = this.togglePortableFilter.bind(this);
    this.toggleUnknownFilter = this.toggleUnknownFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.latLngsArray !== this.state.latLngsArray
      || nextProps.latLngsObj !== this.state.latLngsObj
      || nextProps.slipwayDetails !== this.state.slipwayDetails
    ) {
      this.setState({
        latLngsArray: nextProps.latLngsArray,
        latLngsObj: nextProps.latLngsObj,
        slipwayDetails: nextProps.slipwayDetails,
        filteredSlipwayDetails: nextProps.slipwayDetails
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

  handleZoomChange(newZoom) {
    this.setState({location: {
      zoom: newZoom,
      lat: this.state.location.lat,
      lng: this.state.location.lng
      }
    })
  }

  toggleLargeFilter() {
    let filterObj = {
        filterLarge: !this.state.filter.filterLarge,
        filterSmall: this.state.filter.filterSmall,
        filterPortable: this.state.filter.filterPortable,
        filterUnknown: this.state.filter.filterUnknown
      }
    storeFilterStateInLocalStorage(filterObj)
    this.setState({ filter: filterObj
    })
  }
  toggleSmallFilter() {
    let filterObj = {
      filterLarge: this.state.filter.filterLarge,
      filterSmall: !this.state.filter.filterSmall,
      filterPortable: this.state.filter.filterPortable,
      filterUnknown: this.state.filter.filterUnknown
    }
    storeFilterStateInLocalStorage(filterObj)
    this.setState({ filter: filterObj})
  }
  togglePortableFilter() {
    let filterObj = {
      filterLarge: this.state.filter.filterLarge,
      filterSmall: this.state.filter.filterSmall,
      filterPortable: !this.state.filter.filterPortable,
      filterUnknown: this.state.filter.filterUnknown
      }
    storeFilterStateInLocalStorage(filterObj)
    this.setState({ filter: filterObj })
  }
  toggleUnknownFilter() {
    let filterObj = {
      filterLarge: this.state.filter.filterLarge,
      filterSmall: this.state.filter.filterSmall,
      filterPortable: this.state.filter.filterPortable,
      filterUnknown: !this.state.filter.filterUnknown
      }
    storeFilterStateInLocalStorage(filterObj)
    this.setState({ filter: filterObj})
  }

  render() {
    return (
      <div>
        <BannerResponsiveAd />
        <Map state={this.state} saveMapState={this.saveMapState} onZoomChange={this.handleZoomChange} />
        <nav className="navbar fixed-bottom navbar-light" role="navigation">
          <Nav pills className="w-100">
            <div className=" d-flex flex-row justify-content-around w-100">
              <UncontrolledButtonDropdown direction="up">
                <DropdownToggle caret>
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Suitability</DropdownItem>
                  <DropdownItem onClick={this.toggleLargeFilter}>{this.state.filter.filterLarge && "❌"}{!this.state.filter.filterLarge && "✅"} Large trailer (car)</DropdownItem>
                  <DropdownItem onClick={this.toggleSmallFilter}>{this.state.filter.filterSmall && "❌"}{!this.state.filter.filterSmall && "✅"} Small trailer (pushed)</DropdownItem>
                  <DropdownItem onClick={this.togglePortableFilter}>{this.state.filter.filterPortable && "❌"}{!this.state.filter.filterPortable && "✅"} Portable Only</DropdownItem>
                  <DropdownItem onClick={this.toggleUnknownFilter}>{this.state.filter.filterUnknown && "❌"}{!this.state.filter.filterUnknown && "✅"} Unkown</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </Nav>
        </nav>
      </div>
    )
  }
}

export default LandingPage;
