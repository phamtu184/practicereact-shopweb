import React, { Component } from 'react';
import { ToastContainer ,toast } from 'react-toastify';

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
        <h2>Home</h2>
        <ToastContainer/>
      </div>
    )
  }
}

export default Home;
