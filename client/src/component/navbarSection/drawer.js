import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { SwipeableDrawer, IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { CartContext } from '../../context/cart';
import BackIcon from '../../image/svglogo/back.svg'
import RegisterForm from './registerDrawer';
import LoginForm from './loginDrawer';
import axios from 'axios';
import SnackBar from '../snackBar/snackBar';

const DivFormDrawer = styled.div`
  .card-login, .card-register{
    .MuiButton-root{
      color: white;
      background-color: $blue-600
    }
    .MuiButton-root:hover{
      background-color: $blue-800
    }
  }
`
export default function LoginDrawer(props) {
  const [loginForm, setLoginForm] = useState(true);
  // login
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo, setCartItems, setDrawer } = useContext(CartContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  let history = useHistory();
  const onChangeUsernameLogin = (e) => {
    setUsernameLogin(e.target.value)
  };
  const onChangePasswordLogin = (e) => {
    setPasswordLogin(e.target.value)
  }
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const onSubmitLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let info = {
      username: usernameLogin,
      password: passwordLogin
    }
    if (!info.username || !info.password) {
      setOpenSnackbar(true);
      setInfoSnackbar('Vui lòng nhập đầy đủ các trường');
      setTypeSnackbar('warning');
      setIsLoading(false);
    }
    else {
      axios.post("/auth/login", info)
        .then(res => {
          if (res.data === "notuser") {
            setOpenSnackbar(true);
            setInfoSnackbar('Tài khoản không tồn tại');
            setTypeSnackbar('error');
            setIsLoading(false);
          }
          else if (res.data === "wrongpw") {
            setOpenSnackbar(true);
            setInfoSnackbar('Sai mật khẩu');
            setTypeSnackbar('error');
            setIsLoading(false);
          }
          else {
            localStorage.setItem("event", "LOGIN_SUCCESS");
            setIsLoading(false);
            axios.get('/auth/islogin')
              .then(res => {
                if (res.data !== 'login:false') {
                  setUserInfo({
                    isLogin: true,
                    username: res.data.username,
                    role: res.data.role,
                    id: res.data.id,
                    isAuthenticated: res.data.isAuthenticated
                  })
                  axios.post('/user/cart', { userId: res.data.id })
                    .then(carts => setCartItems(carts.data.map(e => ({ ...e, quantity: 1 }))))
                }
              })
            setUsernameLogin('')
            setPasswordLogin('')
            setDrawer(false)
            history.push("/")
          }
        })
    }
  }
  // register
  const [username, setUsername] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [phone, setPhone] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [email, setEmail] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [password, setPassword] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [passwordCf, setPasswordCf] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [isLoading2, setIsLoading2] = useState(false);

  const onChangeUsername = (event) => {
    setUsername({
      value: event.target.value,
      valid: !!event.target.value && event.target.value.length > 3,
      errorMessage: username.valid ? "" : "Tên đăng nhập phải lớn hơn 3 kí tự"
    })
  }
  const onChangePhone = (event) => {
    const regexp = /^\d{10}$/;
    const checkingResult = regexp.exec(event.target.value);
    setPhone({
      value: event.target.value,
      valid: !!event.target.value && checkingResult !== null,
      errorMessage: phone.valid ? "" : "Số điện thoại chỉ chứa số và 10 kí tự"
    })
  }
  const onChangeEmail = (event) => {
    setEmail({
      value: event.target.value,
      valid: !!event.target.value && event.target.value.length > 5,
      errorMessage: email.valid ? "" : "Tên đăng nhập phải lớn hơn 5 kí tự"
    });
  }
  const onChangePassword = (event) => {
    setPassword({
      value: event.target.value,
      valid: !!event.target.value && event.target.value.length > 5,
      errorMessage: password.valid ? "" : "Mật khẩu phải lớn hơn 5 kí tự"
    });
  }
  const onChangePasswordCf = (event) => {
    setPasswordCf({
      value: event.target.value,
      valid: !!event.target.value && event.target.value === password.value && event.target.value.length > 5,
      errorMessage: passwordCf.valid ? "" : "Xác nhận mật khẩu phải giống với mật khẩu"
    });
  }

  function formValid(arr1, arr2, arr3, arr4, arr5) {
    let arrs = [arr1, arr2, arr3, arr4, arr5]
    let valid = true;
    for (let i = 0; i < arrs.length; i++) {
      if (arrs[i] === false) {
        valid = false;
        break
      }
    }
    return valid
  }

  function nullFormValid(arr1, arr2, arr3, arr4, arr5) {
    let arrs = [arr1, arr2, arr3, arr4, arr5]
    let valid = true;
    for (let i = 0; i < arrs.length; i++) {
      if (arrs[i] === '') {
        valid = false;
        break
      }
    }
    return valid
  }

  const onSubmitRegister = (event) => {
    event.preventDefault();
    setIsLoading2(true);
    const info = {
      username: username.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    }
    if (formValid(username.valid, email.valid,
      phone.valid, password.valid, passwordCf.valid)
      && nullFormValid(username.value, email.value,
        phone.value, password.value,
        passwordCf.value)) {
      axios.post("/auth/register", info)
        .then(res => {
          if (res.data === "USERNAME_EXIST") {
            setOpenSnackbar(true);
            setInfoSnackbar('Tên đăng nhập đã tồn tại');
            setTypeSnackbar('error');
            setIsLoading2(false);
          }
          else if (res.data === "EMAIL_EXIST") {
            setOpenSnackbar(true);
            setInfoSnackbar('Email đã tồn tại');
            setTypeSnackbar('error');
            setIsLoading2(false);
          }
          else {
            axios.post('/auth/confirmemail')
              .then(
                axios.get('/auth/islogin')
                  .then(res => {
                    if (res.data !== 'login:false') {
                      setUserInfo({
                        isLogin: true,
                        username: res.data.username,
                        role: res.data.role,
                        id: res.data.id,
                        isAuthenticated: res.data.isAuthenticated
                      })
                      setDrawer(false)
                      axios.post('/user/cart', { userId: res.data.id })
                        .then(carts => setCartItems(carts.data.map(e => ({ ...e, quantity: 1 }))))
                    }
                  })
              )
              .catch(function (error) {
                console.log(error);
              })
            setIsLoading2(false);
            history.push("/verifyemail")
          }
        })
    }
    else {
      setOpenSnackbar(true);
      setInfoSnackbar('Vui lòng nhập đầy đủ các trường');
      setTypeSnackbar('warning');
      setIsLoading2(false);
    }
  }
  const changeLoginForm = () => {
    setLoginForm(!loginForm);
  }
  return (
    <SwipeableDrawer open={props.isDrawer} onClose={props.closeDrawer}
      onOpen={props.openDrawer} anchor='right'>
      <IconButton onClick={props.closeDrawer} style={{ width: '64px', height: '64px' }}>
        <img src={BackIcon} alt='login icon' style={{ width: '32px', height: '32px' }} />
      </IconButton>
      <DivFormDrawer>
        {loginForm
          ? <LoginForm
            toRegister={changeLoginForm}
            onSubmitLogin={onSubmitLogin}
            onChangeUsernameLogin={onChangeUsernameLogin}
            usernameLogin={usernameLogin}
            onChangePasswordLogin={onChangePasswordLogin}
            passwordLogin={passwordLogin}
            isLoading={isLoading}
          />
          : <RegisterForm toLogin={changeLoginForm} onSubmitRegister={onSubmitRegister}
            onChangeUsername={onChangeUsername}
            username={username} onChangePhone={onChangePhone}
            phone={phone} onChangeEmail={onChangeEmail}
            email={email} onChangePassword={onChangePassword}
            password={password} onChangePasswordCf={onChangePasswordCf}
            passwordCf={passwordCf} isLoading={isLoading2}
          />
        }
      </DivFormDrawer>
      <SnackBar
        openSnackbar={openSnackbar}
        closeSnackbar={closeSnackbar}
        vertical='top'
        horizontal='right'
        typeSnackbar={typeSnackbar}
        infoSnackbar={infoSnackbar}
      />
    </SwipeableDrawer>
  )
}