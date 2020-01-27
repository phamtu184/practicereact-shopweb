import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: ""
    }
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    let info = {
      email: this.state.email,
      password: this.state.password
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
  render(){
    return(
      <MDBContainer>
        <ToastContainer/>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="mt-4 grey-text">
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Login</strong>
                  </h3>
                </div>
                <form onSubmit={this.onSubmit}>
                  <MDBInput
                    label="Your email"
                    type="email"
                    icon="user"
                    onChange={this.onChangeEmail}
                    value={this.state.email}
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    type="password"
                    onChange={this.onChangePassword}
                    value={this.state.password}
                  />
                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                    Forgot
                    <a href="#!" className="blue-text ml-1">
                      Password?
                    </a>
                  </p>
                  <div className="text-center mb-3">
                    <MDBBtn
                      type="submit"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Login
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                  <Link to="/users/register" className="blue-text ml-1">
                    Register
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
export default Login;