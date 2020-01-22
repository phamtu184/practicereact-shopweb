import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBadge
  } from "mdbreact";
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import '../style/style.css'
import Products from '../component/products'
import CartIcon from '../../image/supermarket.svg'
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
                    <MDBNavLink activeClassName="active2" to="/about">About</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink activeClassName="active2" to="/users">Users</MDBNavLink>
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
                    <MDBFormInline waves>
                      <div className="md-form my-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                      </div>
                    </MDBFormInline>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
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

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default Navbar;