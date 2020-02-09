import React from 'react';
import Navbar from './component/navbar'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import {CartProvider} from './context/cart'
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";

import Userslist from './pages/usersList';
import Login from './pages/login';
import Home from './pages/home';
import Products from './pages/products';
import Magproducts from './pages/magProducts';

function App() {
  return (
    <div>
      <Router>
        <CartProvider>
          <Navbar/>
        </CartProvider>
        <Switch>
          <Route path="/users/userslist" component={Userslist}/>
          <Route path="/users/login" component={Login}/>
          <Route path="/products" component={Products}/>
          <Route path="/magproducts" component={Magproducts}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
