import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, BottomNavigation, BottomNavigationAction, Button, IconButton } from '@material-ui/core';
//icon
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LoginIcon from '../image/svglogo/login.svg';

import { NavLink } from "react-router-dom";
//import CartIcon from '../image/svglogo/supermarket.svg'
//import {CartContext} from '../context/cart'
import axios from 'axios';
import Menuitemlogin from './navbarSection/menuItemLogin';
import Menuitemloginbotnav from './navbarSection/menuItemLoginBotNav';
import LoginDrawer from './navbarSection/loginDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar:{
    top: 'auto',
    bottom: 0,
  }
}));

export default function Navbar() {
  const [isLogin, setLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [value, setValue] = useState(0);
  const [isDrawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(true)
  }
  const closeDrawer = () => {
    setDrawer(false)
  }
  useEffect(()=>{
    axios.get('/users/islogin')
    .then(res=>{
      if(res.data!=='login:false'){
        setLogin(true);
        setUsername(res.data.name);
        setRole(res.data.role);
      }
    })
  },[]);
  const classes = useStyles();
  return(
    <>
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
              { role === 1 && 
                <li>
                  <NavLink activeClassName="nav-item-active" to="/magproducts">
                    <Button>Quản lý sản phẩm</Button>
                  </NavLink>
                </li>
              }
            </ul>
            { isLogin
              ?<Menuitemlogin style={{marginLeft:'auto'}} username={username}/>
              :<IconButton edge="start" style={{marginLeft:'auto'}} color="inherit" onClick={openDrawer} >
                <img src={LoginIcon} alt='login icon' style={{width:'32px', height:'32px'}}/>
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      </nav>
      <nav className='bottom-nav'>
        <AppBar position="fixed" className={classes.appBar}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Trang chủ" icon={<HomeRoundedIcon />} component={NavLink} to="/" />
            <BottomNavigationAction label="User List" icon={<HomeRoundedIcon />} component={NavLink} to="/users/userslist"/>
            <BottomNavigationAction label="Products" icon={<ShoppingBasketRoundedIcon />} component={NavLink} to="/products"/>
            { role === 1 && 
              <BottomNavigationAction label="Quản lý" icon={<SettingsRoundedIcon />} component={NavLink} to="/magproducts" />
            }
            { isLogin
              ?<Menuitemloginbotnav username={username}/>
              :<BottomNavigationAction label="Đăng Nhập" icon={<AccountCircleRoundedIcon />} component={NavLink} to="/users/login"/>
            }
          </BottomNavigation>
        </AppBar>
      </nav>
      <LoginDrawer isDrawer={isDrawer} openDrawer={openDrawer} closeDrawer={closeDrawer}/>
    </>
  )
}