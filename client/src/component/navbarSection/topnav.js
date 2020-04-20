import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, IconButton, useScrollTrigger, Slide, Fab, useMediaQuery } from '@material-ui/core';
// icon
import MenuIcon from '../../image/svglogo/menu.svg';
import LoginIcon from '../../image/svglogo/user.svg';
import KeyboardArrowUpIcon from "../../image/jslogo/KeyboardArrowUp";

import { NavLink } from "react-router-dom";
import Menuitemlogin from '../navbarSection/menuItemLogin';
import ScrollTop from './backToTop';
import { CartContext } from '../../context/cart';
import DrawerForm from './drawer';
import CartItems from './cartItems';

const LiIcon = styled.li`
  float: left;
  display: block;
  text-align: center;
  padding: 8px 4px;
  text-decoration: none;
  button{
    font-weight: 550;
  };
  img{
    height: 18px;
    width: 18px;
    margin-right: 5px;
  };
`
const UlNavcontent = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`
export default function Topnav(props) {
  const { cartItems, userInfo, deleteCart, isDrawer, setDrawer } = useContext(CartContext);

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
  const { isLogin, username, role, isAuthenticated } = userInfo
  return (
    <>
      <div>
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
              <UlNavcontent style={{ marginLeft: 'auto' }}>
                <LiIcon>
                  <CartItems cartItems={cartItems} deleteCart={deleteCart} />
                </LiIcon>
                {isLogin
                  ? <LiIcon><Menuitemlogin username={username} isAuthenticated={isAuthenticated} /></LiIcon>
                  : <LiIcon><IconButton edge="start" color="inherit" onClick={openDrawer} >
                    <img src={LoginIcon} alt='login icon' />
                  </IconButton></LiIcon>
                }
              </UlNavcontent>
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
    <UlNavcontent>
      <LiIcon>
        <NavLink activeClassName="nav-item-active" to="/" exact={true}>
          <Button>Trang chủ</Button>
        </NavLink>
      </LiIcon>
      <LiIcon>
        <NavLink activeClassName="nav-item-active" to="/products">
          <Button>Sản phẩm</Button>
        </NavLink>
      </LiIcon>
      {props.role === 1 &&
        <><LiIcon>
          <NavLink activeClassName="nav-item-active" to="/magsetting">
            <Button>Quản lý</Button>
          </NavLink>
        </LiIcon></>
      }
    </UlNavcontent>
  )
}
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}