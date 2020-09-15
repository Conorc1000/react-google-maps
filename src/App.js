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
import { BrowserRouter as Router, Route } from "react-router-dom";
import { firebase, database } from "./firebase";

import * as routes from "./constants/routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      latLngsArray: [],
      latLngsObj: {},
      tidalStations: [
        {name: 'IMMINGHAM', lat:'53.63', lng:'-0.187'}
      , {name: 'CROMER', lat:'52.934', lng:'1.302'}
      , {name: 'LOWESTOFT', lat:'52.473', lng:'1.75'}
      , {name: 'HARWICH', lat:'51.948', lng:'1.292'}
      , {name: 'SHEERNESS', lat:'51.446', lng:'0.743'}
      , {name: 'DOVER', lat:'51.114', lng:'1.323'}
      ]
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authorUser: null });
    });

    database.getLatLngsSnapshot(latLngsObj => {
      let latLngsArray = [];

      for (var LatLngKey in latLngsObj) {
        latLngsArray.push(latLngsObj[LatLngKey]);
      }

      this.setState({
        latLngsObj,
        latLngsArray
      });
    });

    database.getSlipwayDetailsSnapshot(slipwayDetails => {
      this.setState({
        slipwayDetails
      });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Header authUser={this.state.authUser} />

          <Route
            exact
            path={routes.LANDING}
            render={() => (
              <Landing
                latLngsObj={this.state.latLngsObj}
                latLngsArray={this.state.latLngsArray}
                slipwayDetails={this.state.slipwayDetails}
                tidalStations={this.state.tidalStations}
              />
            )}
          />
          <Route exact path={routes.SIGN_UP} component={SignUp} />
          <Route exact path={routes.SIGN_IN} component={SignIn} />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={PasswordForget}
          />
          <Route exact path={routes.ACCOUNT} component={Account} />
          <Route exact path={routes.NEW_SLIPWAY} component={NewSlipway} />
          <Route
            exact path={routes.EDIT_SLIPWAY}
            render={props => (
              <EditSlipway
                id={props.match.params.id}
                latLngArray={this.state.latLngsObj[props.match.params.id]}
                slipwayDetails={this.state.slipwayDetails}
              />
            )}
          />
          <Route
            exact path={routes.VIEW_SLIPWAY}
            render={props => (
              <ViewSlipway
                id={props.match.params.id}
                latLngArray={this.state.latLngsObj[props.match.params.id]}
                slipwayDetails={this.state.slipwayDetails}
              />
            )}
          />
          <Route exact path={routes.ABOUT} component={About} />
          <Route exact path={routes.CONTACT} component={Contact} />
        </div>
      </Router>
    );
  }
}
export default App;
