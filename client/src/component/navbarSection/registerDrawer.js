import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions, TextField, CircularProgress, Snackbar } from '@material-ui/core';
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
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff6565'
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: '#ff6565'
    }
  },
})(TextField);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RegisterDrawer(props) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
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
    setIsLoading(true);
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
            setIsLoading(false);
          }
          else if (res.data === "EMAIL_EXIST") {
            setOpenSnackbar(true);
            setInfoSnackbar('Email đã tồn tại');
            setTypeSnackbar('error');
            setIsLoading(false);
          }
          else {
            axios.post('/auth/confirmemail')
              .then()
              .catch(function (error) {
                console.log(error);
              })
            setIsLoading(false);
            window.location.assign('/verifyemail');
          }
        })
    }
    else {
      setOpenSnackbar(true);
      setInfoSnackbar('Vui lòng nhập đầy đủ các trường');
      setTypeSnackbar('warning');
      setIsLoading(false);
    }
  }
  const vertical = 'top';
  const horizontal = 'right';
  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000}
        onClose={closeSnackbar} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={closeSnackbar} severity={typeSnackbar}>
          {infoSnackbar}
        </Alert>
      </Snackbar>
      <Card className="card-register" style={{ width: '526px' }}>
        <CardContent className="mx-4">
          <div className="text-center">
            <h3 className="mb-5">
              <strong>Đăng kí</strong>
            </h3>
          </div>
          <form onSubmit={onSubmitRegister} autoComplete='nope'>
            <CssTextField
              autoComplete='off'
              variant="outlined"
              label="Tên đăng nhập"
              type="text"
              onChange={onChangeUsername}
              value={username.value}
              fullWidth
              error={username.valid === false}
              helperText={username.valid === false ? username.errorMessage : ''}
            />
            <CssTextField
              variant="outlined"
              label="Số điện thoại"
              type="text"
              onChange={onChangePhone}
              value={phone.value}
              fullWidth
              className='mt-3'
              error={phone.valid === false}
              helperText={phone.valid === false ? phone.errorMessage : ''}
            />
            <CssTextField
              variant="outlined"
              label="Email"
              type="email"
              onChange={onChangeEmail}
              value={email.value}
              fullWidth
              className='mt-3'
              error={email.valid === false}
              helperText={email.valid === false ? email.errorMessage : ''}
            />
            <CssTextField
              variant="outlined"
              label="Mật khẩu"
              type="password"
              onChange={onChangePassword}
              value={password.value}
              fullWidth
              className='mt-3'
              error={password.valid === false}
              helperText={password.valid === false ? password.errorMessage : ''}
            />
            <CssTextField
              variant="outlined"
              label="Xác nhận mật khẩu"
              type="password"
              onChange={onChangePasswordCf}
              value={passwordCf.value}
              fullWidth
              className='mt-3'
              error={passwordCf.valid === false}
              helperText={passwordCf.valid === false ? passwordCf.errorMessage : ''}
            />
            <div className="text-center mb-3">
              <div className="text-center mb-3">
                <Button
                  type="submit"
                  gradient="blue"
                  className="btn-block z-depth-1a mt-4"
                  disabled={isLoading}
                >
                  {isLoading && <CircularProgress size={16} color="inherit" className="middle" />}
                  <span className="ml-2">Đăng kí</span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardActions className="mx-5 pt-3 mb-1">
          <div className="font-small d-flex justify-content-end align-items-center">
            <span>Đã có tài khoản</span>
            <Button onClick={props.toLogin} className="ml-1 white-text">
              Đăng nhập
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  )
}