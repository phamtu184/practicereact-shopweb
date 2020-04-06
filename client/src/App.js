import React from 'react';
import './style/bootstrap.min.css';
import './style/style.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toolbar } from '@material-ui/core';

import Navbar from './component/navbarSection/topnav';
import MagSetting from './pages/magSetting';
import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import { CartProvider } from './context/cart';
import Product from './pages/product';
import VerifyEmail from './pages/verifiEmail';
import VerifyToken from './component/verifyToken/verifyToken';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Toolbar id="back-to-top-anchor" />
        <Switch>
          <Route path="/product/:productId" component={Product} />
          <Route path="/verifyemail" component={VerifyEmail} />
          <Route path="/verifytoken/:token" component={VerifyToken} />
          <Route path="/cart" component={Cart} />
          <Route path="/magsetting" component={MagSetting} />
          <Route path="/products" component={Products} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
