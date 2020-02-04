import React from 'react';
import Navbar from './component/navbar'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import {CartProvider} from './context/cart'
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";

import Userslist from './pages/usersList';
import Login from './pages/login';
import Home from './pages/home';
import Products from './pages/products'

function App() {
  return (
    <div>
      <Router>
      <CartProvider>
        <Navbar></Navbar>
      </CartProvider>
      <Switch>
      <Route path="/users/userslist">
        <Userslist />
      </Route>
      <Route path="/users/login">
        <Login></Login>
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
