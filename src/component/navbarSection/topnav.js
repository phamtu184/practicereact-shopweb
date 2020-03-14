import React from 'react';

import { AppBar, Toolbar, Button, IconButton, useScrollTrigger, Slide, Fab, Badge, SvgIcon } from '@material-ui/core';
// icon
import LoginIcon from '../../image/svglogo/user.svg';
import CartIcon from '../../image/svglogo/supermarket.svg';
import { SearchIcon } from '../../image/svglogo/svlogo'
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { NavLink } from "react-router-dom";
import Menuitemlogin from '../navbarSection/menuItemLogin';
import ScrollTop from './backToTop';

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
        <AppBar color="default" position='fixed' style={{zIndex:'1201'}}>
          <Toolbar className='container'>
            <strong className="white-text mr-2">Navbar</strong>
            <ul className='nav-content-right'>
              <li>
                <NavLink activeClassName="nav-item-active" to="/" exact={true}>
                  <Button>Trang chủ</Button>
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="nav-item-active" to="/products">
                  <Button>Sản phẩm</Button>
                </NavLink>
              </li>
              { props.role === 1 && 
                <><li>
                  <NavLink activeClassName="nav-item-active" to="/magsetting">
                    <Button>Quản lý</Button>
                  </NavLink>
                </li></>
              }
            </ul>
            <ul className='nav-content-left'>
              <li>
                <IconButton edge="start" color="inherit">
                  <Searchicon/>
                </IconButton>
              </li>
              <li>
                <Badge badgeContent={4} color="primary">
                  <IconButton edge="start" color="inherit">
                    <img src={CartIcon} alt='cart icon'/>
                  </IconButton>
                </Badge>
              </li>
              { props.isLogin
                ?<li><Menuitemlogin username={props.username}/></li>
                :<li><IconButton edge="start" color="inherit" onClick={props.openDrawer} >
                  <img src={LoginIcon} alt='login icon'/>
                </IconButton></li>
              }
            </ul>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ScrollTop {...props}>
        <Fab color='primary' size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  )
}

function Searchicon(props){
  return(
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={SearchIcon}/>
    </SvgIcon>
  )
}