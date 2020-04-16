import React, { useEffect, useState } from 'react';

import ScrollAnimation from 'react-animate-on-scroll';
import SnackBar from '../component/snackBar/snackBar';
import Carousel from '../component/homePages/carousel';
import GetAccess from '../component/homePages/getAccess';
import Contact from '../component/homePages/contact';
import Parallax from '../component/homePages/parallax';
import MeetTheDogs from '../component/homePages/meetTheDogs';
import CountDowm from '../component/homePages/countDown';

import { ProductProvider } from '../component/products/productContext';
export default function Home() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  useEffect(() => {
    switch (localStorage.event) {
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
  }, [])
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <div>
      <SnackBar
        openSnackbar={openSnackbar}
        closeSnackbar={closeSnackbar}
        vertical='top'
        horizontal='right'
        typeSnackbar={typeSnackbar}
        infoSnackbar={infoSnackbar}
      />
      <Carousel />
      <ScrollAnimation animateIn='fadeIn'>
        <GetAccess />
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn'>
        <Contact />
      </ScrollAnimation>
      <Parallax />
      <ProductProvider><MeetTheDogs /></ProductProvider>
      <CountDowm />
    </div>
  )
}