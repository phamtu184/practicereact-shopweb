import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBadge, Container
  } from "mdbreact";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'; 
import '../style/style.css'
import CartIcon from '../image/supermarket.svg'
import {CartContext} from '../context/cart'
import axios from 'axios';
import Menuitemlogin from './loginPages/menuItemLogin'

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state= {
      isLogin: false,
      username: '',
      role: '',
      isOpen: false
    };
  }
  componentDidMount(){
    axios.get('/users/islogin')
    .then(res=>{
      if(res.data!=='login:false'){
        this.setState({
          isLogin: true,
          username: res.data.name,
          role: res.data.role
        });
      }
    })
  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render(){
    return(
      <nav>
        <MDBNavbar color="default-color" className="white-text blue darken-3" dark expand="md" scrolling transparent>
          <Container>
            <MDBNavbarBrand>
              <strong className="white-text">Navbar</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" navbar isOpen={this.state.isOpen}>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink activeClassName="active2" to="/">Trang chủ</MDBNavLink>
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
                  { this.state.role === 1 && 
                    <MDBNavLink activeClassName="active2" to="/magproducts">Quản lý sản phẩm</MDBNavLink>
                  }
                </MDBNavItem>
                <MDBNavItem>
                  { this.state.isLogin
                    ?<Menuitemlogin username={this.state.username}/>
                    :<MDBNavLink activeClassName="active2" to="/users/login">Đăng nhập</MDBNavLink>
                  }
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