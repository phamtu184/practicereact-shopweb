import React from 'react';
import TextField from '@material-ui/core/TextField';
import { MDBBtn, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBAnimation} from 'mdbreact'
import { withStyles } from '@material-ui/core/styles';

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

export default function Formregister(props) {
  return(
    <MDBCol md="6" xl="6" className="mb-4">
      <MDBAnimation type="fadeInRight" delay=".3s">
        <MDBCard className="mt-4 white-text">
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="mb-5">
                <strong>Register</strong>
              </h3>
            </div>
            <form onSubmit={props.onSubmitRegister}>
              <CssTextField 
                variant="outlined"
                label="Full name"
                type="text"
                onChange={props.onChangeFullname}
                value={props.valueFullname}
                fullWidth
              />
              <CssTextField
                variant="outlined"
                label="Phone number"
                type="text"
                onChange={props.onChangePhone}
                value={props.valuePhone}
                fullWidth
                className='mt-3'
              />
              <CssTextField
                variant="outlined"
                label="Email"
                type="email"
                onChange={props.onChangeEmail}
                value={props.valueEmail}
                fullWidth
                className='mt-3'
              />
              <CssTextField
                variant="outlined"
                label="Password"
                type="password"
                onChange={props.onChangePassword}
                value={props.valuePassword}
                fullWidth
                className='mt-3'
              />
              <CssTextField
                variant="outlined"
                label="Password confirm"
                type="password"
                onChange={props.onChangePasswordCf}
                value={props.valuePasswordCf}
                fullWidth
                className='mt-3'
              />
              <div className="custom-control custom-radio was-validated mt-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  id="customControlValidation2"
                  name="radio-stacked"
                  required
                  value="2"
                  onClick={props.onClickRole2}
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
                 onClick={props.onClickRole3}
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
              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a mt-4"
                >
                  Register
                </MDBBtn>
              </div>
            </form> 
          </MDBCardBody>
          <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="font-small d-flex justify-content-end">
              Have an account?
              <a type='button' onClick={props.toLogin} className="ml-1">
                Login
              </a>
            </p>
          </MDBModalFooter>
        </MDBCard>
      </MDBAnimation>
    </MDBCol>
  )
}