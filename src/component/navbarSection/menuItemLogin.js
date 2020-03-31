import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import axios from 'axios';

export default function Menuitemlogin(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      axios.post('/auth/islogin')
        .then(window.location.assign('/'))
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
      </Menu>
    </>
  );
}