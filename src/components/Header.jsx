import React, {Component} from "react";
import * as routes from '../constants/routes';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
              <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">Boatlaunch</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
                    </NavItem>
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
                      <NavLink href="/find-me/">Find Me</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/add-new-slipway/">Add new slipway</NavLink>
                    </NavItem>
                
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
    }
}

export default Header;