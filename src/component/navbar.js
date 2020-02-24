import React, { useState, useEffect} from 'react';

import '../style/bootstrap.min.css'; 
import '../style/style.scss'
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, BottomNavigation, BottomNavigationAction, Button, IconButton, SvgIcon } from '@material-ui/core';
import MenuIcon from '../image/svglogo/menu.svg';
import { NavLink } from "react-router-dom";

//import CartIcon from '../image/svglogo/supermarket.svg'
//import {CartContext} from '../context/cart'
import axios from 'axios';
import Menuitemlogin from './loginPages/menuItemLogin';
import Menuitemloginbotnav from './loginPages/menuItemLoginBotNav';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar:{
    top: 'auto',
    bottom: 0,
  }
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Navbar() {
  const [isLogin, setIslogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [isCollapse, setIsCollapse] = useState(false);
  const [value, setValue] = useState(0);
  useEffect(()=>{
    axios.get('/users/islogin')
    .then(res=>{
      if(res.data!=='login:false'){
        setIslogin(true);
        setUsername(res.data.name);
        setRole(res.data.role);
      }
    })
  },[]);
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  }
  const classes = useStyles();
  return(
    <div>
      <nav className='top-nav'>
        <AppBar color="default" position='fixed'>
          <Toolbar className='container'>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleCollapse}>
              <img className='toggle-icon' src={MenuIcon} alt='menu icon' style={{width:'32px', height:'32px'}}/>
            </IconButton>
            <strong className="white-text">Navbar</strong>
            <ul className={`nav-content ${isCollapse ? 'is-collapse' : ''}`}>
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
              { isLogin
                ?<li><Menuitemlogin username={username}/></li>
                :<li>
                  <NavLink activeClassName="nav-item-active" to="/users/login">
                    <Button>Đăng Nhập</Button>
                  </NavLink>
                </li>
              }
            </ul>
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
            <BottomNavigationAction label="Trang chủ" icon={<HomeIcon />} component={NavLink} to="/" />
            <BottomNavigationAction label="User List" icon={<HomeIcon />} component={NavLink} to="/users/userslist"/>
            <BottomNavigationAction label="Products" icon={<HomeIcon />} component={NavLink} to="/products"/>
            { role === 1 && 
              <BottomNavigationAction label="Quản lý sản phẩm" icon={<HomeIcon />} component={NavLink} to="/magproducts" />
            }
            { isLogin
              ?<Menuitemloginbotnav username={username}/>
              :<BottomNavigationAction label="Đăng Nhập" icon={<HomeIcon />} component={NavLink} to="/users/login"/>
            }
          </BottomNavigation>
        </AppBar>
      </nav>
    </div>
  )
}