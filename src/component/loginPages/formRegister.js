import React, {useState} from 'react';
import {TextField, CircularProgress, Button} from '@material-ui/core';
import { MDBBtn, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBAnimation} from 'mdbreact'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline' : {
      borderColor: '#ff6565'
    },
    '& .MuiFormHelperText-root.Mui-error' : {
      color: '#ff6565'
    }
  },
})(TextField);

export default function Formregister(props) {
  const [state, setState] = useState({
    fullname: {
      value: "",
      valid: true,
      errorMessage: ""
    },
    phone: {
      value: "",
      valid: true,
      errorMessage: ""
    },
    email: {
      value: "",
      valid: true,
      errorMessage: ""
    },
    password: {
      value: "",
      valid: true,
      errorMessage: ""
    },
    passwordCf: {
      value: "",
      valid: true,
      errorMessage: ""
    },
    isLoading: false
  });

  const onChangeFullname = (event)=> {
    setState({
      ...state,
      fullname : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value.length > 5,
        errorMessage: state.fullname.valid ? "" : "Họ tên phải lớn hơn 5 kí tự"
      }
    })
  }
  const onChangePhone = (event)=> {
    const regexp = /^\d{10}$/;
    const checkingResult = regexp.exec(event.target.value);
    setState({
      ...state,
      phone : {
        value: event.target.value,
        valid: !!event.target.value && checkingResult !== null,
        errorMessage: state.phone.valid ? "" : "Số điện thoại chỉ chứa số và 10 kí tự"
      }
    })
  }
  const onChangeEmail = (event)=> {
    setState({ 
      ...state,
      email : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value.length > 5,
        errorMessage: state.email.valid ? "" : "Tên đăng nhập phải lớn hơn 5 kí tự"
      }
    });
  }
  const onChangePassword = (event)=> {
    setState({ 
      ...state,
      password : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value.length > 5,
        errorMessage: state.password.valid ? "" : "Mật khẩu phải lớn hơn 5 kí tự"
      } 
    });
  }
  const onChangePasswordCf = (event)=> {
    setState({ 
      ...state,
      passwordCf : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value === state.password.value && event.target.value.length > 5,
        errorMessage: state.passwordCf.valid ? "" : "Xác nhận mật khẩu phải giống với mật khẩu"
      }
    });
  }

  function formValid(arr1, arr2, arr3, arr4, arr5){
    let arrs = [arr1, arr2, arr3, arr4, arr5]
    let valid = true;
    for(let i = 0; i<arrs.length; i++){
      if(arrs[i]===false){
        valid = false;
        break
      }
    }
    return valid
  }
  
  function nullFormValid(arr1, arr2, arr3, arr4, arr5){
    let arrs = [arr1, arr2, arr3, arr4, arr5]
    let valid = true;
    for(let i = 0; i<arrs.length; i++){
      if(arrs[i]===''){
        valid = false;
        break
      }
    }
    return valid
  }

  const onSubmitRegister = (event)=> {
    event.preventDefault();
    setState({ ...state, isLoading: true });
    const info = {
      fullname: state.fullname.value,
      phone: state.phone.value,
      email: state.email.value,
      password: state.password.value,
      role: state.role,
      confirmed: false
    }
    if (formValid(state.fullname.valid, state.email.valid,
        state.phone.valid, state.password.valid,
        state.passwordCf.valid)
        && nullFormValid(state.fullname.value, state.email.value,
          state.phone.value, state.password.value,
          state.passwordCf.value)){
      axios.post("/users/register", info)
        .then(res => {
          if(res.data === "exist"){
            toast.error("Email đã tồn tại!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            })
            setState({ ...state, isLoading: false });
          }
          else{
            toast.success("Đăng kí thành công!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            })
            setState({ ...state, isLoading: false });
          }
        })
    }
    else{
      toast.warn("Vui lòng nhập đầy đủ các trường", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      setState({...state, isLoading: false })
    }
  }
  
  const {isLoading} = state;
  return(
    <MDBCol md="6" xl="6" className="mb-4">
      <MDBAnimation type="fadeInRight" delay=".3s">
        <MDBCard className="mt-4 white-text">
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="mb-5">
                <strong>Đăng kí</strong>
              </h3>
            </div>
            <form onSubmit={onSubmitRegister} autoComplete='nope'>
              <CssTextField 
                autoComplete='off'
                variant="outlined"
                label="Họ tên"
                type="text"
                onChange={onChangeFullname}
                value={state.fullname.value}
                fullWidth
                error={state.fullname.valid===false}
                helperText={state.fullname.valid===false ? state.fullname.errorMessage:''}
              />
              <CssTextField
                variant="outlined"
                label="Số điện thoại"
                type="text"
                onChange={onChangePhone}
                value={state.phone.value}
                fullWidth
                className='mt-3'
                error={state.phone.valid===false}
                helperText={state.phone.valid===false ? state.phone.errorMessage:''}
              />
              <CssTextField
                variant="outlined"
                label="Email"
                type="email"
                onChange={onChangeEmail}
                value={state.email.value}
                fullWidth
                className='mt-3'
                error={state.email.valid===false}
                helperText={state.email.valid===false ? state.email.errorMessage:''}
              />
              <CssTextField
                variant="outlined"
                label="Mật khẩu"
                type="password"
                onChange={onChangePassword}
                value={state.password.value}
                fullWidth
                className='mt-3'
                error={state.password.valid===false}
                helperText={state.password.valid===false ? state.password.errorMessage:''}
              />
              <CssTextField
                variant="outlined"
                label="Xác nhận mật khẩu"
                type="password"
                onChange={onChangePasswordCf}
                value={state.passwordCf.value}
                fullWidth
                className='mt-3'
                error={state.passwordCf.valid===false}
                helperText={state.passwordCf.valid===false ? state.passwordCf.errorMessage:''}
              />            
              <div className="text-center mb-3">
                <div className="text-center mb-3">
                  <MDBBtn
                    type="submit"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a mt-4"
                    disabled={isLoading}
                  >
                    { isLoading && <CircularProgress size={16} color="inherit" className="middle"/> }
                    <span className="ml-2">Đăng kí</span> 
                  </MDBBtn> 
                </div>
              </div>
            </form> 
          </MDBCardBody>
          <MDBModalFooter className="mx-5 pt-3 mb-1">
            <div className="font-small d-flex justify-content-end align-items-center">
              <span>Đã có tài khoản</span>
              <Button onClick={props.toLogin} className="ml-1 white-text">
                Đăng nhập
              </Button>
            </div>
          </MDBModalFooter>
        </MDBCard>
      </MDBAnimation>
    </MDBCol>
  )
}