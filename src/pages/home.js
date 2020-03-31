import React, { useEffect, useState } from 'react';
import SnackBar from '../component/snackBar/snackBar';
import Carousel from '../component/homePages/carousel';
import LayoutPromoBox from '../component/homePages/layoutPromoBox';
import Features from '../component/homePages/features';
import ProductList from '../component/homePages/newProductList';

export default function Home() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  useEffect(() => {
    switch(localStorage.event){
      case 'LOGIN_SUCCESS':
        setOpenSnackbar(true);
        setInfoSnackbar('Đăng nhập thành công');
        setTypeSnackbar('success');
        localStorage.removeItem("event");
        break;
      case 'ACTIVE_EMAIL':
        setOpenSnackbar(true);
        setInfoSnackbar('Kích hoạt email thành công');
        setTypeSnackbar('success');
        localStorage.removeItem("event");
        break;
      default:
    }
  },[])
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return(
    <div>
      <SnackBar 
        openSnackbar={openSnackbar} 
        closeSnackbar={closeSnackbar} 
        vertical='top' 
        horizontal='right' 
        typeSnackbar={typeSnackbar} 
        infoSnackbar={infoSnackbar}
      />
      <Carousel/>
      <LayoutPromoBox/>
      <Features/>
      <ProductList/>
    </div>
  )
}