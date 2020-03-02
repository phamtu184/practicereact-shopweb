import React, { useState } from 'react';

import { AppBar, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
//icon
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import Menuitemloginbotnav from '../navbarSection/menuItemLoginBotNav';

const useStyles = makeStyles(theme => ({
  appBar:{
    top: 'auto',
    bottom: 0,
  }
}));

export default function Botnav(props){
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return(
    <nav className='bottom-nav'>
      <AppBar position="fixed" className={classes.appBar}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction 
            label="Trang chủ" 
            icon={<HomeRoundedIcon />} 
            component={NavLink} to="/" 
          />
          <BottomNavigationAction 
            label="Products" 
            icon={<ShoppingBasketRoundedIcon />} 
            component={NavLink} to="/products"
          />
          {props.role === 1 && 
            <>
              <BottomNavigationAction 
                label="Quản lý" 
                icon={<SettingsRoundedIcon />} 
                component={NavLink} to="/magproducts" 
              />
              <BottomNavigationAction 
                label="User List" 
                icon={<HomeRoundedIcon />} 
                component={NavLink} to="/users/userslist"
              />
            </>
          }
          {props.isLogin
            ?<Menuitemloginbotnav username={props.username}/>
            :<BottomNavigationAction 
              label="Đăng Nhập" 
              icon={<AccountCircleRoundedIcon />} 
              onClick={props.openDrawer}
            />
          }
        </BottomNavigation>
      </AppBar>
    </nav>
  )
}