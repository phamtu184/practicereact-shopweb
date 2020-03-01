import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Carousel from '../component/homePages/carousel';
import Features from '../component/homePages/features';
import ProductList from '../component/homePages/newProductList';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  useEffect(() => {
    if(localStorage.welcome){
      setOpenSnackbar(true);
      setInfoSnackbar('Đăng nhập thành công');
      setTypeSnackbar('success');
      localStorage.removeItem("welcome");
    }
  },[])
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const vertical = 'top';
  const horizontal = 'right';
  return(
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} 
      onClose={closeSnackbar} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={closeSnackbar} severity={typeSnackbar}>
          {infoSnackbar}
        </Alert>
      </Snackbar>
      <Carousel/>
      <Features/>
      <ProductList/>
    </div>
  )
}