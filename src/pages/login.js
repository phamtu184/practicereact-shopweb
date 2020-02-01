import React, { Component } from 'react';
import { MDBContainer, MDBRow,
         MDBView, MDBMask } from 'mdbreact';
import Formlogin from '../component/loginPages/formLogin';
import Formregister from '../component/loginPages/formRegister';
import Leftinfologin from '../component/loginPages/infoLeftLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      emailLogin: "",
      passwordLogin: "",
      fullname: {
        value: "",
        valid: false,
        errorMessage: ""
      },
      phone: {
        value: "",
        valid: false,
        errorMessage: ""
      },
      email: {
        value: "",
        valid: false,
        errorMessage: ""
      },
      password: {
        value: "",
        valid: false,
        errorMessage: ""
      },
      passwordCf: {
        value: "",
        valid: false,
        errorMessage: ""
      },
      role: "",
      loginForm: true
    }
    this.onChangeEmailLogin = this.onChangeEmailLogin.bind(this);
    this.onChangePasswordLogin = this.onChangePasswordLogin.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this)
    
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordCf = this.onChangePasswordCf.bind(this);
    this.onClickRole2 = this.onClickRole2.bind(this);
    this.onClickRole3 = this.onClickRole3.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
  }
  onChangeEmailLogin(e){
    this.setState({
      emailLogin: e.target.value
    })
  }
  onChangePasswordLogin(e){
    this.setState({
      passwordLogin: e.target.value
    })
  }
  toRegister(e){
    this.setState({
      loginForm: !this.state.loginForm
    })
  }
  onSubmitLogin(e){
    e.preventDefault();
    let info = {
      email: this.state.emailLogin,
      password: this.state.passwordLogin
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
        }
        else{
          console.log(res)
          toast.success("Đăng nhập thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        }
      })
    }
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
        valid: !!event.target.value && event.target.value === this.state.password.value,
        errorMessage: this.valid ? "" : "Xác nhận mật khẩu phải giống với mật khẩu"
      } });
  }
  onClickRole2(event){
    this.setState({
      role: event.target.value
    })
  }
  onClickRole3(event){
    this.setState({
      role: event.target.value
    })
  }
  onSubmitRegister(event){
    event.preventDefault();
    const info = {
      fullname: this.state.fullname.value,
      phone: this.state.phone.value,
      email: this.state.email.value,
      password: this.state.password.value,
      role: this.state.role,
      confirmed: false
    }
    if (formValid(this.state.fullname.valid, this.state.email.valid, this.state.phone.valid, this.state.password.valid, this.state.passwordCf.valid)){
      axios.post("/users/register", info)
      .then(res => {
        if(res.data === "exist"){
          toast.error("User da ton tai!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        }
        else{
          toast.success("User added!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
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
    }
  }
  render(){
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
      />
    );
    const loginForm = this.state.loginForm;
    return(
      <div id='classicformpage'>
        {overlay}
        <ToastContainer/>
        <MDBView>
          <MDBMask className="d-flex justify-content-center gradient">
            <MDBContainer>
              <MDBRow className="mt-4">
                <Leftinfologin/>
                {loginForm ? (
                  <Formlogin
                    onSubmitLogin={this.onSubmitLogin}
                    onChangeEmailLogin={this.onChangeEmailLogin} 
                    onChangePasswordLogin={this.onChangePasswordLogin}
                    valueEmailLogin={this.state.emailLogin}
                    valuePasswordLogin={this.state.passwordLogin}
                    toRegister={this.toRegister}
                  />
                ) : (
                  <Formregister
                    toLogin={this.toRegister}
                    onChangeFullname={this.onChangeFullname}
                    onChangePhone={this.onChangePhone}
                    onChangeEmail={this.onChangeEmail}
                    onChangePassword={this.onChangePassword}
                    onChangePasswordCf={this.onChangePasswordCf}
                    onClickRole2={this.onClickRole2}
                    onClickRole3={this.onClickRole3}
                    valueFullname={this.state.fullname.value}
                    valuePhone={this.state.phone.value}
                    valueEmail={this.state.email.value}
                    valuePassword={this.state.password.value}
                    valuePasswordCf={this.state.passwordCf.value}
                    onSubmitRegister={this.onSubmitRegister}
                  />
                )}
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    )
  }
}
export default Login;