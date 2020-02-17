import React, { useState } from 'react';
import { MDBContainer, MDBRow,
         MDBView, MDBMask } from 'mdbreact';
import Formlogin from '../component/loginPages/formLogin';
import Formregister from '../component/loginPages/formRegister';
import Leftinfologin from '../component/loginPages/infoLeftLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
  const [ loginForm, setLoginForm ] = useState(true);
  const toRegister = (e) => {
    setLoginForm(!loginForm)
  }
  return(
    <div id='classicformpage'>
      <ToastContainer/>
      <MDBView>
        <MDBMask className="d-flex justify-content-center gradient">
          <MDBContainer>
            <MDBRow className="mt-4">
              <Leftinfologin/>
              {loginForm ? (
                <Formlogin toRegister={toRegister}/>
              ) : (
                <Formregister toLogin={toRegister}/>
              )}
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </div>
  )
}