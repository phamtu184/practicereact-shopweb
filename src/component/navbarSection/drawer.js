import React, { useState } from 'react';
import { SwipeableDrawer, IconButton } from '@material-ui/core';
import BackIcon from '../../image/svglogo/back.svg'
import RegisterForm from './registerDrawer';
import LoginForm from './loginDrawer';

export default function LoginDrawer(props){
  const [loginForm, setLoginForm] = useState(true);
  
  const changeLoginForm = () => {
    setLoginForm(!loginForm);
  }
  return(
    <SwipeableDrawer open={props.isDrawer} onClose={props.closeDrawer} 
    onOpen={props.openDrawer} anchor='right'>
      <IconButton onClick={props.closeDrawer} style={{width:'64px', height:'64px'}}>
        <img src={BackIcon} alt='login icon' style={{width:'32px', height:'32px'}} />
      </IconButton>
      { loginForm
        ? <LoginForm toRegister={changeLoginForm}/>
        : <RegisterForm toLogin={changeLoginForm}/>
      }
    </SwipeableDrawer>
  )
}