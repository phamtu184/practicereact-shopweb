import React from 'react';
import Navbar from './component/navbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'; 
import {CartProvider} from './context/cart'

function App() {
  return (
    <CartProvider>
      <Navbar></Navbar>
    </CartProvider>
  );
}

export default App;
