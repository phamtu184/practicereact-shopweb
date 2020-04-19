import React from 'react';
import './style/bootstrap.min.css';
import './style/style.css';
import './style/animate.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { AnimatedSwitch, spring } from 'react-router-transition';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Toolbar } from '@material-ui/core';
import { PrivateRouteAdmin, PrivateRouteAuthen } from './pages/privateRoute';

import Navbar from './component/navbarSection/topnav';
import Footer from './component/footer/footer'
import MagSetting from './pages/magSetting';
import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import { CartProvider } from './context/cart';
import Product from './pages/product';
import VerifyEmail from './pages/verifiEmail';
import VerifyToken from './component/verifyToken/verifyToken';

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 30,
  });
}
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}
function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Toolbar id="back-to-top-anchor" />
        <AnimatedSwitch
          atEnter={{
            opacity: 0,
            scale: 1.2
          }}
          atLeave={{
            opacity: bounce(0),
            scale: bounce(0.8)
          }}
          atActive={{
            opacity: bounce(1),
            scale: bounce(1),
          }}
          mapStyles={mapStyles}
        >
          <PrivateRouteAdmin path="/magsetting">
            <MagSetting />
          </PrivateRouteAdmin>
          <PrivateRouteAuthen path="/verifyemail">
            <VerifyEmail />
          </PrivateRouteAuthen>
          <PrivateRouteAuthen path="/verifytoken/:token">
            <VerifyToken />
          </PrivateRouteAuthen>
          <Route path="/product/:productId" component={Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={Products} />
          <Route path="/" component={Home} />
        </AnimatedSwitch>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;