import React from 'react';
import { Menu, MenuItem, BottomNavigationAction, SvgIcon } from '@material-ui/core';
import axios from 'axios';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

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
      <BottomNavigationAction label={props.username} icon={<HomeIcon />} onClick={handleClick} />
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