import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBadge, Container
  } from "mdbreact";

import '../style/style.css'
import CartIcon from '../image/supermarket.svg'
import {CartContext} from '../context/cart'

class Navbar extends Component{
  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render(){
    return(
      <nav>
        <MDBNavbar color="default-color" className="white-text blue darken-3" dark expand="md">
          <Container>
            <MDBNavbarBrand>
              <strong className="white-text">Navbar</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/users/register">Register</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/users/userslist">Users list</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/products">Products</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">Dropdown</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/products">
                    <img src={CartIcon} alt='carticon' style={{width:'16px', height:'16px'}}></img>
                    <CartContext.Consumer>
                      {({cartItems}) => <MDBBadge color="danger" className="ml-2">{cartItems.length}</MDBBadge>}
                    </CartContext.Consumer>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/users/login">Login</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </Container>
        </MDBNavbar>
      </nav>
    )
  }
}

export default Navbar;