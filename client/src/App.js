import React, { lazy, Suspense } from "react";
import "./style/main.css";
import "./style/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Loader from "./component/loader/pageLoader";
import { Toolbar } from "@material-ui/core";
import ScrollToTop from "./config/scrollToTop";
import { PrivateRouteAdmin, PrivateRouteAuthen } from "./pages/privateRoute";

import Navbar from "./component/navbarSection/topnav";
import Footer from "./component/footer/footer";
import { CartProvider } from "./context/cart";

const Home = lazy(() => import("./pages/home"));
const MagSetting = lazy(() => import("./pages/magSetting"));
const Products = lazy(() => import("./pages/products"));
const Cart = lazy(() => import("./pages/cart"));
const Product = lazy(() => import("./pages/product"));
const VerifyEmail = lazy(() => import("./pages/verifiEmail"));
const VerifyToken = lazy(() => import("./component/verifyToken/verifyToken"));

function App() {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <div style={{ width: "100%", height: "100vh" }}>
            <Loader />
          </div>
        }
      >
        <Router>
          <Navbar />
          <Toolbar id="back-to-top-anchor" />
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={450}
                  classNames="fade"
                >
                  <ScrollToTop>
                    <Switch location={location}>
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
                    </Switch>
                  </ScrollToTop>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Footer />
        </Router>
      </Suspense>
    </CartProvider>
  );
}

export default App;
