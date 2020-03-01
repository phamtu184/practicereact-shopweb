import React from 'react';
import './style/bootstrap.min.css'; 
import './style/style.scss';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";

import Navbar from './component/navbarSection/navbar';
import Userslist from './pages/usersList';
import Home from './pages/home';
import Products from './pages/products';
import Magproducts from './pages/magProducts';

function App() {
  return (
    <Router>
      <Navbar/>
      <div style={{height:'64px'}}/>
      <Switch>
        <Route path="/users/userslist" component={Userslist}/>
        <Route path="/products" component={Products}/>
        <Route path="/magproducts" component={Magproducts}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
