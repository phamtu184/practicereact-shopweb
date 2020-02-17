import React from "react";
import {  MDBRow, MDBCol, MDBContainer } from "mdbreact";
import { Paper } from '@material-ui/core';
import PetsIconPug from '../../image/pug.svg';

const FeaturesPage = () => {
  return (
    <MDBContainer className="text-center my-5">
      <h2 className="h1-responsive font-weight-bold my-5">
        Why is it so great?
      </h2>
      <p className="lead grey-text w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam.
      </p>
      <MDBRow>
        <MDBCol md="4">
          <Paper elevation={3} className="px-4 py-4 h-100 w-100">
            <img src={PetsIconPug} alt='carticon' style={{width:'60px', height:'60px'}}></img>
            <h5 className="font-weight-bold my-4">Analytics</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </Paper>
        </MDBCol>
        <MDBCol md="4">
          <Paper elevation={3} className="px-4 py-4 h-100 w-100">
            <img src={PetsIconPug} alt='carticon' style={{width:'60px', height:'60px'}}></img>
            <h5 className="font-weight-bold my-4">Analytics</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              
            </p>
          </Paper>
        </MDBCol>
        <MDBCol md="4">
          <Paper elevation={3} className="px-4 py-4 h-100 w-100">
            <img src={PetsIconPug} alt='carticon' style={{width:'60px', height:'60px'}}></img>
            <h5 className="font-weight-bold my-4">Analytics</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </Paper>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default FeaturesPage;