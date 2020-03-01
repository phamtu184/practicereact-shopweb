import React from 'react';

import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import LoginIcon from '../../image/svglogo/login.svg';
import { NavLink } from "react-router-dom";
import Menuitemlogin from '../navbarSection/menuItemLogin';

export default function Topnav(props){
  return(
    <nav className='top-nav'>
      <AppBar color="default" position='fixed'>
        <Toolbar className='container'>
          <strong className="white-text">Navbar</strong>
          <ul className='nav-content'>
            <li>
              <NavLink activeClassName="nav-item-active" to="/" exact={true}>
                <Button>Trang chủ</Button>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-item-active" to="/users/userslist">
                <Button>User List</Button>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-item-active" to="/products">
                <Button>Products</Button>
              </NavLink>
            </li>
            { props.role === 1 && 
              <li>
                <NavLink activeClassName="nav-item-active" to="/magproducts">
                  <Button>Quản lý sản phẩm</Button>
                </NavLink>
              </li>
            }
          </ul>
          { props.isLogin
            ?<Menuitemlogin style={{marginLeft:'auto'}} username={props.username}/>
            :<IconButton edge="start" style={{marginLeft:'auto'}} color="inherit" onClick={props.openDrawer} >
              <img src={LoginIcon} alt='login icon' style={{width:'32px', height:'32px'}}/>
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </nav>
  )
}