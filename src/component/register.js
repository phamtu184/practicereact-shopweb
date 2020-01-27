import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBModalFooter } from 'mdbreact';
import {Link} from "react-router-dom";
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
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
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
      role: ""
    }
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordCf = this.onChangePasswordCf.bind(this);
    this.onClickRole2 = this.onClickRole2.bind(this);
    this.onClickRole3 = this.onClickRole3.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  onChangeemail(event){
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
  onSubmit(event){
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
        if(res.data === "added"){
          toast.success("User added!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        }
        else{
          toast.error("User da ton tai!", {
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
    return(
      <MDBContainer>
        <ToastContainer/>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="mt-4">
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <p className="h5 text-center mb-4">Register</p>
                  <div className="grey-text">
                    <MDBInput
                      value={this.state.fullname.value}
                      className={this.state.fullname.valid ? "is-valid" : "is-invalid"}
                      name="fullname"
                      label="Full name"
                      icon="user"
                      type="text"
                      onChange={this.onChangeFullname}
                    >
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">{this.state.fullname.errorMessage}</div>
                    </MDBInput>
                    <MDBInput
                      value={this.state.phone.value}
                      className={this.state.phone.valid ? "is-valid" : "is-invalid"}
                      name="phone"
                      label="Phone number"
                      icon="phone"
                      type="text"
                      onChange={this.onChangePhone}
                    >
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">{this.state.phone.errorMessage}</div>
                    </MDBInput>
                    <MDBInput
                      value={this.state.email.value}
                      className={this.state.email.valid ? "is-valid" : "is-invalid"}
                      name="email"
                      label="Email"
                      icon="user"
                      type="email"
                      onChange={this.onChangeemail}
                    >
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">{this.state.email.errorMessage}</div>
                    </MDBInput>
                    <MDBInput
                      value={this.state.password.value}
                      className={this.state.password.valid ? "is-valid" : "is-invalid"}
                      name="password"
                      label="Password"
                      icon="lock"
                      type="password"
                      onChange={this.onChangePassword}
                    >
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">{this.state.password.errorMessage}</div>
                    </MDBInput>
                    <MDBInput
                      value={this.state.passwordCf.value}
                      className={this.state.passwordCf.valid ? "is-valid" : "is-invalid"}
                      name="passwordCf"
                      label="Password confirm"
                      icon="lock"
                      type="password"
                      onChange={this.onChangePasswordCf}
                    >
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">{this.state.passwordCf.errorMessage}</div>
                    </MDBInput>
                    <div className="custom-control custom-radio was-validated">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="customControlValidation2"
                        name="radio-stacked"
                        required
                        value="2"
                        onClick={this.onClickRole2}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlValidation2"
                      >
                        Chủ khách sạn
                      </label>
                    </div>
                    <div className="custom-control custom-radio mb-3 was-validated">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="customControlValidation3"
                        name="radio-stacked"
                        required
                        value="3"
                        onClick={this.onClickRole3}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlValidation3"
                      >
                        Khách
                      </label>
                      <div className="invalid-feedback">
                        Vui lòng chọn vai trò
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    <MDBBtn
                      type="submit"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Have an account?
                  <Link to="/users/login" className="blue-text ml-1">
                    Login
                  </Link>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}
export default Register;