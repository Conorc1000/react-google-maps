import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import PasswordForget from "./components/PasswordForgetPage";
import Account from "./components/AccountPage";
import NewSlipway from "./components/NewSlipway";
import EditSlipway from "./components/EditSlipway";
import ViewSlipway from "./components/ViewSlipway";
import About from "./components/About";
import Contact from "./components/Contact";

import { 
  BrowserRouter as Router,
  Route, 
} from 'react-router-dom';
import {firebase, database} from './firebase'

import * as routes from "./constants/routes"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      latLngsArray:[],
      latLngsObj:{},
    }
  }

  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({authUser})
        : this.setState({authorUser: null})
    })

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

  }

  render () {
    return (
      <Router>
        <div>
          <Header authUser={this.state.authUser} />
      
          <Route
            exact path = {routes.LANDING}
            render={()=><Landing 
              latLngsObj = {this.state.latLngsObj}
              latLngsArray={this.state.latLngsArray}
              slipwayDetails = {this.state.slipwayDetails}
            />}
          />
          <Route
            exact path = {routes.SIGN_UP}
            component={SignUp}
          />
          <Route
            exact path = {routes.SIGN_IN}
            component={SignIn}
          />
          <Route
            exact path = {routes.PASSWORD_FORGET}
            component={PasswordForget}
          />
          <Route
            exact path = {routes.ACCOUNT}
            component={Account}
          />
          <Route
            exact path = {routes.NEW_SLIPWAY}
            component={NewSlipway}
          />
          <Route
            exact path = {routes.EDIT_SLIPWAY}
            component={EditSlipway}
          />
           <Route
            exact path = {routes.VIEW_SLIPWAY}
            match = {this.state.match}
            render={()=><ViewSlipway 
              match = {this.state.match}
              latLngsObj = {this.state.latLngsObj}
              latLngsArray={this.state.latLngsArray}
              slipwayDetails = {this.state.slipwayDetails}
            />}
          />
          <Route
            exact path = {routes.ABOUT}
            component={About}
          />
          <Route
            exact path = {routes.CONTACT}
            component={Contact}
          />
        </div>
      </Router>)
  }
}
export default App;
