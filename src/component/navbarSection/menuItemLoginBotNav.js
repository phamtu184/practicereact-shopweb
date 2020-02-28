import React from 'react';
import { Menu, MenuItem, BottomNavigationAction } from '@material-ui/core';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Menuitemloginbotnav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    try{
    axios.post('/users/islogin')
    .then(window.location.assign('/'))
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div>
      <BottomNavigationAction label={props.username} icon={<ExitToAppIcon />} onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </div>
  );
}