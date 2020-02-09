import React, { Component } from 'react';
import { MDBContainer, MDBRow,
         MDBView, MDBMask } from 'mdbreact';
import Formlogin from '../component/loginPages/formLogin';
import Formregister from '../component/loginPages/formRegister';
import Leftinfologin from '../component/loginPages/infoLeftLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      loginForm: true
    }
    this.toRegister = this.toRegister.bind(this);
  }
  toRegister(e){
    this.setState({
      loginForm: !this.state.loginForm
    })
  }
  
  render(){
    const loginForm = this.state.loginForm;
    return(
      <div id='classicformpage'>
        <ToastContainer/>
        <MDBView>
          <MDBMask className="d-flex justify-content-center gradient">
            <MDBContainer>
              <MDBRow className="mt-4">
                <Leftinfologin/>
                {loginForm ? (
                  <Formlogin toRegister={this.toRegister}/>
                ) : (
                  <Formregister toLogin={this.toRegister}/>
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