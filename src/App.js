import React from "react";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./components/Landing";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import PasswordForgetPage from "./components/PasswordForgetPage";
import AccountPage from "./components/AccountPage";
import NewSlipwayPage from "./components/NewSlipwayPage";
import { 
  BrowserRouter as Router,
  Route, 
} from 'react-router-dom';

import * as routes from "./constants/routes"

const App = () => 
  <Router>
    <div>
      <Header />
    
      <Route
        exact path = {routes.LANDING}
        component={LandingPage}
      />
      <Route
        exact path = {routes.SIGN_UP}
        component={SignUpPage}
      />
      <Route
        exact path = {routes.SIGN_IN}
        component={SignInPage}
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
    </div>
  </Router>


export default App;
