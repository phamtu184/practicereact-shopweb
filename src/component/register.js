import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
//import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      fname: {
        value: "",
        valid: false
      },
      uname: {
        value: "",
        valid: false
      },
      password: {
        value: "",
        valid: false
      }
    }
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeUname = this.onChangeUname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  onChangeFname = event => {
    this.setState({
      fname : {
        value: event.target.value,
        valid: true
      }
    })
  }
  onChangeUname = event => {
    this.setState({ [event.target.Uname]: { value: event.target.value, valid: !!event.target.value } });
  }
  onChangePassword = event => {
    this.setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
  }
  render(){
    return(
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form className="mt-4">
              <p className="h5 text-center mb-4">Register</p>
              <div className="grey-text">
                <MDBInput
                  value={this.state.fname.value}
                  className={this.state.fname.valid ? "is-valid" : "is-invalid"}
                  name="fname"
                  label="Full name"
                  icon="user"
                  type="text"
                  onChange={this.onChangeFname}
                >
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Provide a valid name!</div>
                </MDBInput>
                <MDBInput
                  value={this.state.uname.value}
                  className={this.state.uname.valid ? "is-valid" : "is-invalid"}
                  name="uname"
                  label="Username"
                  icon="user"
                  type="text"
                  onChange={this.changeHandler}
                >
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Provide a valid name!</div>
                </MDBInput>
                <MDBInput
                  value={this.state.password.value}
                  className={this.state.password.valid ? "is-valid" : "is-invalid"}
                  name="password"
                  label="Password"
                  icon="lock"
                  type="password"
                  onChange={this.changeHandler}
                >
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Provide a valid name!</div>
                </MDBInput>
              </div>
              <div className="text-center">
                <MDBBtn outline color="info">
                  Register <MDBIcon far icon="paper-plane" className="ml-1" />
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}
export default Register;