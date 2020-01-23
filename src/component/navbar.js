import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBadge
  } from "mdbreact";
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import '../style/style.css'
import Products from './products'
import CartIcon from '../image/supermarket.svg'
import {CartContext} from '../context/cart'
import Register from './register';
import Userslist from './usersList';
import Login from './login';

class Navbar extends Component{
  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render(){
    return(
      <Router>
        <div>
          <nav>
            <MDBNavbar color="default-color" className="white-text blue darken-3" dark expand="md">
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
            </MDBNavbar>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/users/register">
              <Register />
            </Route>
            <Route path="/users/userslist">
              <Userslist />
            </Route>
            <Route path="/users/login">
              <Login></Login>
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

function Home() {
  return <h2>Home</h2>;
}

export default Navbar;