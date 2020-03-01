import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions, 
  TextField, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginDrawer(props){
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');

  const onChangeEmailLogin = (e)=>{
    setEmailLogin(e.target.value)
  };
  const onChangePasswordLogin = (e)=>{
    setPasswordLogin(e.target.value)
  }
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const onSubmitLogin= (e)=>{
    e.preventDefault();
    setIsLoading(true);
    let info = {
      email: emailLogin,
      password: passwordLogin
    }
    if(!info.email || !info.password){
      setOpenSnackbar(true);
      setInfoSnackbar('Vui lòng nhập đầy đủ các trường');
      setTypeSnackbar('warning');
      setIsLoading(false);
    }
    else{
      axios.post("/users/login", info)
      .then(res => {
        if(res.data==="notuser"){
          setOpenSnackbar(true);
          setInfoSnackbar('Tài khoản không tồn tại');
          setTypeSnackbar('error');
          setIsLoading(false);
        }
        else if(res.data==="wrongpw"){
          setOpenSnackbar(true);
          setInfoSnackbar('Sai mật khẩu');
          setTypeSnackbar('error');
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
  const vertical = 'top';
  const horizontal = 'right';
  return(
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} 
      onClose={closeSnackbar} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={closeSnackbar} severity={typeSnackbar}>
          {infoSnackbar}
        </Alert>
      </Snackbar>
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
    </>
  )
}