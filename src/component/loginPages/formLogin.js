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

export default function Formlogin(props) {
  return(
    <MDBCol md="6" xl="5" className="mb-4 align-self-center">
      <MDBAnimation type="fadeInRight" delay=".3s">
        <MDBCard className="mt-4 white-text">
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="mb-5">
                <strong>Login</strong>
              </h3>
            </div>
            <form onSubmit={props.onSubmitLogin}>
              <CssTextField 
                variant="outlined"
                label="Your email"
                type="email"
                onChange={props.onChangeEmailLogin}
                value={props.valueEmailLogin}
                fullWidth
              />
              <CssTextField
                variant="outlined"
                label="Your password"
                type="password"
                onChange={props.onChangePasswordLogin}
                value={props.valuePasswordLogin}
                fullWidth
                className='mt-3'
              />
              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a mt-4"
                >
                  Login
                </MDBBtn>
              </div>
            </form> 
          </MDBCardBody>
          <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="font-small d-flex justify-content-end">
              Not a member?
              <a type='button' onClick={props.toRegister} className="ml-1">
                Register
              </a>
            </p>
          </MDBModalFooter>
        </MDBCard>
      </MDBAnimation>
    </MDBCol>
  )
}
