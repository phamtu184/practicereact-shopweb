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
  },
})(TextField);

export default function LoginDrawer(props) {
  const { onSubmitLogin, onChangeUsernameLogin, usernameLogin, onChangePasswordLogin, passwordLogin, isLoading, toRegister } = props;
  return (
    <Card className='card-login'>
      <CardContent className="mx-4">
        <div className="text-center">
          <h3 className="mb-5">
            <strong>Đăng nhập</strong>
          </h3>
        </div>
        <form onSubmit={onSubmitLogin}>
          <CssTextField
            variant="outlined"
            label="Tên đăng nhập"
            type="text"
            onChange={onChangeUsernameLogin}
            value={usernameLogin}
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
              {isLoading && <CircularProgress size={16} color="inherit" className="middle" />}
              <span className="ml-2">Login</span>
            </Button>
          </div>
        </form>
      </CardContent>
      <CardActions className="mx-5 pt-3 mb-1">
        <p className="font-small d-flex justify-content-end align-items-center">
          Chưa có tài khoản?
          <button onClick={toRegister} className="ml-1" style={{ backgroundColr: 'white', color: '#1e88e5', border: 'none' }}>
            Đăng kí
          </button>
        </p>
      </CardActions>
    </Card>
  )
}