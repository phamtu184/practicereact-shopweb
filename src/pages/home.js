import React, {useEffect} from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import Carousel from '../component/homePages/carousel';
import Features from '../component/homePages/features';
import ProductList from '../component/homePages/newProductList';
import Drawer from '../component/navbarSection/loginDrawer';

import { DrawerProvider } from '../context/drawer';

export default function Home() {
  useEffect(() => {
    if(localStorage.welcome){
      toast.success("Đăng nhập thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      localStorage.removeItem("welcome");
    }
  },[])
  return(
    <div>
      <ToastContainer/>
      <Carousel/>
      <Features/>
      <ProductList/>
      <DrawerProvider>
        <Drawer/>
      </DrawerProvider>
    </div>
  )
}