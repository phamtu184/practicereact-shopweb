import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import { CartContext } from '../../context/cart';
import axios from 'axios';

export default function Menuitemlogin(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setUserInfo, setCartItems } = React.useContext(CartContext);
  let history = useHistory();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      axios.post('/auth/islogin', {}, { withCredentials: true })
        .then(() => {
          setUserInfo({
            isLogin: false,
            username: '',
            role: 2,
            isAuthenticated: false,
            id: ''
          })
          setCartItems([])
        })
      history.push("/")
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
        {props.username}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        {props.isAuthenticated
          ? null
          : <Link to='/verifyemail'><MenuItem>Kích hoạt tài khoản</MenuItem></Link>}
      </Menu>
    </>
  );
}