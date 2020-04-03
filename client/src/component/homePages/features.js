import React from "react";
import { Paper } from '@material-ui/core';
import PetsIconPug from '../../image/svglogo/pug.svg';
import Parallax from '../homePages/parallax';
import urlimg from '../../image/background/girl.jpg';

const FeaturesPage = () => {
  return (
    <div className="text-center">
      <Parallax urlimg={urlimg} height='200px'>
        <h2 className="h1-responsive font-weight-bold my-5 text-white">
          Why is it so great?
        </h2>
        <p className="lead w-responsive mx-auto mb-5 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.
        </p>
      </Parallax>
      <div className="text-center my-5 container">
        <div className='row'>
          <div className='col-md-4'>
            <Paper elevation={3} className="px-4 py-4 h-100 w-100">
              <img src={PetsIconPug} alt='carticon' style={{ width: '60px', height: '60px' }}></img>
              <h5 className="font-weight-bold my-4">Analytics</h5>
              <p className="grey-text mb-md-0 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti hic.
              </p>
            </Paper>
          </div>
          <div className='col-md-4'>
            <Paper elevation={3} className="px-4 py-4 h-100 w-100">
              <img src={PetsIconPug} alt='carticon' style={{ width: '60px', height: '60px' }}></img>
              <h5 className="font-weight-bold my-4">Analytics</h5>
              <p className="grey-text mb-md-0 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Paper>
          </div>
          <div className='col-md-4'>
            <Paper elevation={3} className="px-4 py-4 h-100 w-100">
              <img src={PetsIconPug} alt='carticon' style={{ width: '60px', height: '60px' }}></img>
              <h5 className="font-weight-bold my-4">Analytics</h5>
              <p className="grey-text mb-md-0 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti hic.
              </p>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;