import React from 'react';
import Navbar from './client/component/navbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'; 
import {CartProvider} from './client/context/cart'

function App() {
  return (
    <CartProvider>
      <Navbar></Navbar>
    </CartProvider>
  );
}

export default App;
