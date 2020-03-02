import React from 'react';

import { AppBar, Toolbar, Button, IconButton, useScrollTrigger, Slide, Fab } from '@material-ui/core';
import LoginIcon from '../../image/svglogo/login.svg';
import { NavLink } from "react-router-dom";
import Menuitemlogin from '../navbarSection/menuItemLogin';
import ScrollTop from './backToTop';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Topnav(props){
  return(
    <div className='top-nav'>
      <HideOnScroll {...props}>
        <AppBar color="default" position='fixed'>
          <Toolbar className='container'>
            <strong className="white-text mr-2">Navbar</strong>
            <ul className='nav-content'>
              <li>
                <NavLink activeClassName="nav-item-active" to="/" exact={true}>
                  <Button>Trang chủ</Button>
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="nav-item-active" to="/products">
                  <Button>Products</Button>
                </NavLink>
              </li>
              { props.role === 1 && 
                <><li>
                  <NavLink activeClassName="nav-item-active" to="/magproducts">
                    <Button>Quản lý sản phẩm</Button>
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="nav-item-active" to="/users/userslist">
                    <Button>User List</Button>
                  </NavLink>
                </li></>
              }
            </ul>
            { props.isLogin
              ?<Menuitemlogin style={{marginLeft:'auto'}} username={props.username}/>
              :<IconButton edge="start" style={{marginLeft:'auto'}} color="inherit" onClick={props.openDrawer} >
                <img src={LoginIcon} alt='login icon' style={{width:'22px', height:'22px'}}/>
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  )
}