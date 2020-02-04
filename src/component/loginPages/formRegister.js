import React, {Component} from 'react';
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

class Formregister extends Component {
  constructor(props){
    super(props);
    this.state={
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
      isLoading: false,
    }
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordCf = this.onChangePasswordCf.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
  }

  onChangeFullname(event) {
    this.setState({
      fullname : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value.length > 5,
        errorMessage: this.valid ? "" : "Họ tên phải lớn hơn 5 kí tự"
      }
    })
  }
  onChangePhone(event) {
    const regexp = /^\d{10}$/;
    const checkingResult = regexp.exec(event.target.value);
    this.setState({
      phone : {
        value: event.target.value,
        valid: !!event.target.value && checkingResult !== null,
        errorMessage: this.valid ? "" : "Số điện thoại chỉ chứa số và 10 kí tự"
      }
    })
  }
  onChangeEmail(event){
    this.setState({ 
      email : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value.length > 5,
        errorMessage: this.valid ? "" : "Tên đăng nhập phải lớn hơn 5 kí tự"
      }});
  }
  onChangePassword(event){
    this.setState({ 
      password : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value.length > 5,
        errorMessage: this.valid ? "" : "Mật khẩu phải lớn hơn 5 kí tự"
      } });
  }
  onChangePasswordCf(event){
    this.setState({ 
      passwordCf : {
        value: event.target.value,
        valid: !!event.target.value && event.target.value === this.state.password.value && event.target.value.length > 5,
        errorMessage: this.valid ? "" : "Xác nhận mật khẩu phải giống với mật khẩu"
      } });
  }
  onSubmitRegister(event){
    event.preventDefault();
    this.setState({ isLoading: true });
    const info = {
      fullname: this.state.fullname.value,
      phone: this.state.phone.value,
      email: this.state.email.value,
      password: this.state.password.value,
      role: this.state.role,
      confirmed: false
    }
    if (formValid(this.state.fullname.valid, this.state.email.valid,
        this.state.phone.valid, this.state.password.valid,
        this.state.passwordCf.valid)
        && nullFormValid(this.state.fullname.value, this.state.email.value,
          this.state.phone.value, this.state.password.value,
          this.state.passwordCf.value)){
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
            this.setState({ isLoading: false });
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
            this.setState({ isLoading: false });
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
      this.setState({ isLoading: false })
    }
  }
  
  render(){
    const {isLoading} = this.state;
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
              <form onSubmit={this.onSubmitRegister} autoComplete='nope'>
                <CssTextField 
                  autoComplete='off'
                  variant="outlined"
                  label="Họ tên"
                  type="text"
                  onChange={this.onChangeFullname}
                  value={this.valueFullname}
                  fullWidth
                  error={this.state.fullname.valid===false}
                  helperText={this.state.fullname.valid===false?this.state.fullname.errorMessage:''}
                />
                <CssTextField
                  variant="outlined"
                  label="Số điện thoại"
                  type="text"
                  onChange={this.onChangePhone}
                  value={this.valuePhone}
                  fullWidth
                  className='mt-3'
                  error={this.state.phone.valid===false}
                  helperText={this.state.phone.valid===false?this.state.phone.errorMessage:''}
                />
                <CssTextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  onChange={this.onChangeEmail}
                  value={this.valueEmail}
                  fullWidth
                  className='mt-3'
                  error={this.state.email.valid===false}
                  helperText={this.state.email.valid===false?this.state.email.errorMessage:''}
                />
                <CssTextField
                  variant="outlined"
                  label="Mật khẩu"
                  type="password"
                  onChange={this.onChangePassword}
                  value={this.valuePassword}
                  fullWidth
                  className='mt-3'
                  error={this.state.password.valid===false}
                  helperText={this.state.password.valid===false?this.state.password.errorMessage:''}
                />
                <CssTextField
                  variant="outlined"
                  label="Xác nhận mật khẩu"
                  type="password"
                  onChange={this.onChangePasswordCf}
                  value={this.valuePasswordCf}
                  fullWidth
                  className='mt-3'
                  error={this.state.passwordCf.valid===false}
                  helperText={this.state.passwordCf.valid===false?this.state.passwordCf.errorMessage:''}
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
                <Button onClick={this.props.toLogin} className="ml-1 white-text">
                  Đăng nhập
                </Button>
              </div>
            </MDBModalFooter>
          </MDBCard>
        </MDBAnimation>
      </MDBCol>
    )
  }
}

export default Formregister;