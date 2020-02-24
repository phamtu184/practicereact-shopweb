import React, { useState } from 'react';
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
        <div className="d-flex justify-content-center gradient">
          <div className='container'>
            <div className="row mt-4">
              <Leftinfologin/>
              {loginForm ? (
                <Formlogin toRegister={toRegister}/>
              ) : (
                <Formregister toLogin={toRegister}/>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}