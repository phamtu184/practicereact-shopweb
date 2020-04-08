import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions, TextField, CircularProgress } from '@material-ui/core';

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

export default function RegisterDrawer(props) {
  const { onSubmitRegister,
    onChangeUsername,
    username, onChangePhone,
    phone, onChangeEmail,
    email, onChangePassword,
    password, onChangePasswordCf,
    passwordCf, isLoading, toLogin } = props
  return (
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
          <button onClick={toLogin} className="ml-1" style={{ backgroundColr: 'white', color: '#1e88e5', border: 'none' }}>
            Đăng nhập
          </button>
        </div>
      </CardActions>
    </Card>
  )
}