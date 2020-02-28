import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, Button, Card, CardContent, CardActions, TextField, CircularProgress, IconButton } from '@material-ui/core';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoginIcon from '../../image/svglogo/login.svg';
//import { DrawerContext } from '../../context/drawer';

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        color: 'black'
      },
      '&:hover fieldset': {
        borderColor: '#40c4ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4285F4',
      },
    },
  },
})(TextField);

export default function DrawerLogin(props){
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const { isDrawer, openDrawer, closeDrawer } = useContext(DrawerContext);

  const onChangeEmailLogin = (e)=>{
    setEmailLogin(e.target.value)
  };
  const onChangePasswordLogin = (e)=>{
    setPasswordLogin(e.target.value)
  }
  const onSubmitLogin= (e)=>{
    e.preventDefault();
    setIsLoading(true);
    let info = {
      email: emailLogin,
      password: passwordLogin
    }
    if(!info.email || !info.password){
      toast.warn("Vui lòng nhập đầy đủ các trường", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      setIsLoading(false);
    }
    else{
      axios.post("/users/login", info)
      .then(res => {
        if(res.data==="notuser"){
          toast.error("Tài khoản không tồn tại", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
          setIsLoading(false);
        }
        else if(res.data==="wrongpw"){
          toast.error("Sai mật khẩu", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
          setIsLoading(false);
        }
        else{
          localStorage.setItem("welcome", "true");
          setIsLoading(false);
          window.location.assign('/');
        }
      })
    }
  }
  return(
    <SwipeableDrawer open={props.isDrawer} onClose={props.closeDrawer} onOpen={props.openDrawer} anchor='right'>
      <IconButton onClick={props.closeDrawer} style={{width:'64px', height:'64px'}}>
        <img src={LoginIcon} alt='login icon' style={{width:'32px', height:'32px'}} />
      </IconButton>
      <Card>
        <CardContent className="mx-4">
          <div className="text-center">
            <h3 className="mb-5">
              <strong>Đăng nhập</strong>
            </h3>
          </div>
          <form onSubmit={onSubmitLogin}>
            <CssTextField 
              variant="outlined"
              label="Email"
              type="email"
              onChange={onChangeEmailLogin}
              value={emailLogin}
              fullWidth
            />
            <CssTextField
              variant="outlined"
              label="Mật khẩu"
              type="password"
              onChange={onChangePasswordLogin}
              value={passwordLogin}
              fullWidth
              className='mt-3'
            />
            <div className="text-center mb-3">
            <Button
              type="submit"
              gradient="blue"
              className="btn-block z-depth-1a mt-4"
              disabled={isLoading}
            >
              { isLoading && <CircularProgress size={16} color="inherit" className="middle"/> }
              <span className="ml-2">Login</span> 
            </Button>                  
            </div>
          </form> 
        </CardContent>
        <CardActions className="mx-5 pt-3 mb-1">
          <p className="font-small d-flex justify-content-end align-items-center">
            Chưa có tài khoản?
            <Button onClick={props.toRegister} className="ml-1 white-text">
              Đăng kí
            </Button>
          </p>
        </CardActions>
      </Card>
    </SwipeableDrawer>
  )
}