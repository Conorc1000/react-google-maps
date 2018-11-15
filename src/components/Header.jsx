import React, {Component} from "react";
import * as routes from '../constants/routes';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SignOutButton from "./SignOut";

const NavigationAuth = () => {
  return (
    <Nav navbar>
      <NavItem>
        <NavLink href={routes.LANDING}>Map</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.HOME}>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.ACCOUNT}>Account</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/add-new-slipway/">Add Slipway</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.ABOUT}>About Us</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.CONTACT}>Contact</NavLink>
      </NavItem>
      <NavItem>
        <SignOutButton />
      </NavItem>
    </Nav>
  )
}

const NavigationNonAuth = () => {
  return (
    <Nav navbar>
      <NavItem>
      <NavLink href={routes.SIGN_UP}>Sign Up</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.LANDING}>Map</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.ABOUT}>About Us</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={routes.CONTACT}>Contact</NavLink>
      </NavItem>
    </Nav>
  )
}


class Header extends Component {
    
    constructor(props){
      super(props);
      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
          collapsed: true
      };
    }

    toggleNavbar(){
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    
    render () {
        return (
            <div>
              <Navbar light>
                <NavbarBrand href="/" className="mr-auto">Boatlaunch</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                <div>
                  { this.props.authUser
                      ? <NavigationAuth />
                      : <NavigationNonAuth />
                  }
                </div>
                </Collapse>
              </Navbar>
            </div>
          );
    }
}

export default Header;