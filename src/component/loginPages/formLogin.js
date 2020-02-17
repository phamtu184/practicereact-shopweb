import React, {useState} from 'react';
import { TextField, CircularProgress, Button } from '@material-ui/core';
import { MDBBtn, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBAnimation} from 'mdbreact'
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import axios from 'axios';

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        color: 'white'
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

export default function Formlogin (props) {
  const [emailLogin, setEmailLogin] = useState(null);
  const [passwordLogin, setPasswordLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    <MDBCol md="6" xl="5" className="mb-4 align-self-center">
      <MDBAnimation type="fadeInRight" delay=".3s">
        <MDBCard className="mt-4 white-text">
          <MDBCardBody className="mx-4">
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
              <MDBBtn
                type="submit"
                gradient="blue"
                rounded
                className="btn-block z-depth-1a mt-4"
                disabled={isLoading}
              >
                { isLoading && <CircularProgress size={16} color="inherit" className="middle"/> }
                <span className="ml-2">Login</span> 
              </MDBBtn>                  
              </div>
            </form> 
          </MDBCardBody>
          <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="font-small d-flex justify-content-end align-items-center">
              Chưa có tài khoản?
              <Button onClick={props.toRegister} className="ml-1 white-text">
                Đăng kí
              </Button>
            </p>
          </MDBModalFooter>
        </MDBCard>
      </MDBAnimation>
    </MDBCol>
  )
}
