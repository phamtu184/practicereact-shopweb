import React, { Component } from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import Carousel from '../component/homePages/carousel'
import ProductList from '../component/homePages/newProductList'

class Home extends Component {

  componentDidMount(){
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
  }
  render(){
    return(
      <div>
        <ToastContainer/>
        <Carousel/>
        <ProductList/>
      </div>
    )
  }
}

export default Home;
