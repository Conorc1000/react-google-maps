import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./components/Landing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForgetPage";
import AccountPage from "./components/AccountPage";
import NewSlipwayPage from "./components/NewSlipwayPage";
import About from "./components/About";
import Contact from "./components/Contact";


import { 
  BrowserRouter as Router,
  Route, 
} from 'react-router-dom';
import {firebase} from './firebase'

import * as routes from "./constants/routes"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({authUser})
        : this.setState({authorUser: null})
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Header authUser={this.state.authUser} />
        
          <Route
            exact path = {routes.LANDING}
            component={LandingPage}
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
            component={PasswordForgetPage}
          />
          <Route
            exact path = {routes.ACCOUNT}
            component={AccountPage}
          />
          <Route
            exact path = {routes.NEW_SLIPWAY}
            component={NewSlipwayPage}
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
