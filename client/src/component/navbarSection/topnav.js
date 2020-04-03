import React, { useContext, useState } from 'react';

import { AppBar, Toolbar, Button, IconButton, useScrollTrigger, Slide, Fab, SvgIcon, useMediaQuery } from '@material-ui/core';
// icon
import MenuIcon from '../../image/svglogo/menu.svg';
import LoginIcon from '../../image/svglogo/user.svg';
import { SearchIcon } from '../../image/jslogo/svlogo';
import KeyboardArrowUpIcon from "../../image/jslogo/KeyboardArrowUp";

import { NavLink } from "react-router-dom";
import Menuitemlogin from '../navbarSection/menuItemLogin';
import ScrollTop from './backToTop';
import { CartContext } from '../../context/cart';
import DrawerForm from './drawer';
import CartItems from './cartItems';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Topnav(props) {
  const { cartItems, userInfo, deleteCart } = useContext(CartContext);
  const [isDrawer, setDrawer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const openDrawer = () => {
    setDrawer(true)
  }
  const closeDrawer = () => {
    setDrawer(false)
  }
  const handleExpanded = () => {
    setIsExpanded(!isExpanded)
  }
  const matches = useMediaQuery('(max-width:800px)');
  const { isLogin, username, role } = userInfo
  return (
    <>
      <div className='top-nav'>
        <HideOnScroll {...props}>
          <AppBar color="default" position='fixed' style={{ zIndex: '1201' }}>
            <Toolbar className='container'>
              <strong className="white-text mr-2">Navbar</strong>
              {matches
                ? <>
                  <div className='expanded-icon'>
                    <IconButton onClick={handleExpanded}><img src={MenuIcon} alt='MenuIcon' /></IconButton>
                  </div>
                </>
                : <NavbarLeft role={role} />
              }
              <ul className='nav-content-right'>
                <li>
                  <IconButton edge="start" color="inherit">
                    <Searchicon />
                  </IconButton>
                </li>
                <li>
                  <CartItems cartItems={cartItems} deleteCart={deleteCart} />
                </li>
                {isLogin
                  ? <li><Menuitemlogin username={username} /></li>
                  : <li><IconButton edge="start" color="inherit" onClick={openDrawer} >
                    <img src={LoginIcon} alt='login icon' />
                  </IconButton></li>
                }
              </ul>
            </Toolbar>
            {matches
              ? <>
                <div className={isExpanded ? 'collapsed is-expanded' : 'collapsed'}>
                  <NavLink activeClassName="nav-item-active" to="/" exact={true}>
                    <Button>Trang chủ</Button>
                  </NavLink>
                  <NavLink activeClassName="nav-item-active" to="/products">
                    <Button>Sản phẩm</Button>
                  </NavLink>
                  {props.role === 1 &&
                    <NavLink activeClassName="nav-item-active" to="/magsetting">
                      <Button>Quản lý</Button>
                    </NavLink>
                  }
                </div>
              </>
              : ''
            }

          </AppBar>
        </HideOnScroll>
        <ScrollTop {...props}>
          <Fab color='primary' size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
      <DrawerForm isDrawer={isDrawer} closeDrawer={closeDrawer} openDrawer={openDrawer} />
    </>
  )
}

function NavbarLeft(props) {
  return (
    <ul className='nav-content-left'>
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
      {props.role === 1 &&
        <><li>
          <NavLink activeClassName="nav-item-active" to="/magsetting">
            <Button>Quản lý</Button>
          </NavLink>
        </li></>
      }
    </ul>
  )
}

function Searchicon(props) {
  return (
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={SearchIcon} />
    </SvgIcon>
  )
}