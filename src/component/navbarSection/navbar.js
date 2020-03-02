import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topnav from './topnav';
import Botnav from './botnav';
import Drawer from './drawer';

export default function Navbar() {
  const [isLogin, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(2);
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
        setUsername(res.data.username);
        setRole(res.data.role);
      }
    })
  },[]);
  return(
    <>
      <Topnav isLogin={isLogin} role={role} username={username} openDrawer={openDrawer}/>
      <Botnav isLogin={isLogin} role={role} username={username} openDrawer={openDrawer}/>
      <Drawer isDrawer={isDrawer} openDrawer={openDrawer} closeDrawer={closeDrawer}/>
    </>
  )
}